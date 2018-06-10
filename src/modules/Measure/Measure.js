import L from "leaflet";
import React from "react";
import { Menu } from "semantic-ui-react";
import MapService from "../../service/MapService";

export default class Measure extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      position: 'topleft',
      //  weather to use keyboard control for this plugin
      keyboard: true,
      //  shortcut to activate measure
      activeKeyCode: 'M'.charCodeAt(0),
      //  shortcut to cancel measure, defaults to 'Esc'
      cancelKeyCode: 27,
      //  line color
      lineColor: '#003478',
      //  line weight
      lineWeight: 2,
      //  line dash
      lineDashArray: '6, 6',
      //  line opacity
      lineOpacity: 1,
    };
    this.map = MapService._map;
    this.state = { measuring: false };
    this.service = new MapService();
    this.measuring = false;
    this.toggleMeasure = this.toggleMeasure.bind(this);
    this.onMapKeyDown = this.onMapKeyDown.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    // ;
    window.L = L;
  }
  componentDidMount() {
    console.log("this is map", this.map);
    L.DomEvent.on(document, 'keydown', this.onMapKeyDown, this.map);
    // setTimeout(() => { console.log(MapService._map);  }, 5000);
  }

  onMapKeyDown(e) {
    // key control
    switch (e.keyCode) {
      case this.options.activeKeyCode:
        if (!this.measuring) {
          this.toggleMeasure();
        }
        break;
      case this.options.cancelKeyCode:
        //  if measuring, cancel measuring
        if (this.measuring) {
          if (!this.lastPoint) {
            this.toggleMeasure();
          } else {
            this.finishPath();
            this.isRestarted = false;
          }
        }
        break;
      default:
        break;
    }
  }
  toggleMeasure(e) {
    if (e) this.service.stopMapEvents(e);
    this.measuring = !this.measuring;
    this.setState({ measuring: !this.state.measuring });
    if (this.measuring) {
      this.startMeasuring();
    } else {
      this.stopMeasuring();
    }
  }
  startMeasuring() {
    this.oldCursor = this.map._container.style.cursor;
    this.map._container.style.cursor = "crosshair";
    this.doubleClickZoom = this.map.doubleClickZoom.enabled();
    this.map.doubleClickZoom.disable();
    this.isRestarted = false;

    L.DomEvent
      .on(this.map, "mousemove", this.mouseMove, this.map)
      .on(this.map, "click", this.mouseClick, this.map)
      .on(this.map, "dbclick", this.finishPath, this.map);

    if (!this.layerPaint) {
      this.layerPaint = L.layerGroup().addTo(this.map);
    }

    if (!this.points) {
      this.points = [];
    }
  }
  stopMeasuring() {
    this.map._container.style.cursor = this.oldCursor;

    L.DomEvent
      .off(this.map, "mousemove", this.mouseMove, this.map)
      .off(this.map, "click", this.mouseClick, this.map)
      .off(this.map, "dbclick", this.finishPath, this.map);

    if (this.doubleClickZoom) {
      this.map.doubleClickZoom.enabled();
    }
    if (this.layerPaint) {
      this.layerPaint.clearLayers();
    }

    this.restartPath();
  }
  mouseMove(e) {
    if (!e.latlng || !this.lastPoint) {
      return;
    }
    if (!this.layerPaintPathTemp) {
      //  customize style
      this.layerPaintPathTemp = L.polyline([this.lastPoint, e.latlng], {
        color: this.options.lineColor,
        weight: this.options.lineWeight,
        opacity: this.options.lineOpacity,
        clickable: false,
        dashArray: this.options.lineDashArray,
      }).addTo(this.layerPaint);
    } else {
      //  replace the current layer to the newest draw points
      this.layerPaintPathTemp.getLatLngs().splice(0, 2, this.lastPoint, e.latlng);
      //  force path layer update
      this.layerPaintPathTemp.redraw();
    }

    //  tooltip
    if (this.tooltip) {
      if (!this.distance) {
        this.distance = 0;
      }
      this.updateTooltipPosition(e.latlng); // i
      const distance = e.latlng.distanceTo(this.lastPoint);
      this.updateTooltipDistance(this.distance + distance, distance); // i
    }
  }
  mouseClick(e) {
    if (!e.latlng) {
      return;
    }

    if (this.isRestarted) {
      this.isRestarted = false;
      return;
    }

    if (this.lastPoint && this.tooltip) {
      if (!this.distance) {
        this.distance = 0;
      }

      this.updateTooltipPosition(e.latlng);
      const distance = e.latlng.distanceTo(this.lastPoint);
      this.updateTooltipDistance(this.distance + distance, distance);

      this.distance += distance;
    }

    this.createTooltip(e.latlng); // i

    //  main layer add to layerPaint
    if (this.lastPoint && !this.layerPaintPath) {
      this.layerPaintPath = L.polyline([this.lastPoint], {
        color: this.options.lineColor,
        weight: this.options.lineWeight,
        opacity: this.options.lineOpacity,
        clickable: false,
      }).addTo(this.layerPaint);
    }

    //  push current point to the main layer
    if (this.layerPaintPath) {
      this.layerPaintPath.addLatLng(e.latlng);
    }

    if (this.lastPoint) {
      if (this.lastCircle) {
        this.lastCircle.off('click', this.finishPath, this);
      }
      this.lastCircle = this.createCircle(e.latlng).addTo(this.layerPaint); // i
      this.lastCircle.on('click', this.finishPath, this);
    }

    this.lastPoint = e.latlng;
  }
  finishPath(e) {
    if (e) {
      L.DomEvent.preventDefault(e);
    }
    if (this.lastCircle) {
      this.lastCircle.off('click', this.finishPath, this);
    }
    if (this.tooltip) {
      //  when remove from map, the _icon property becomes null
      this.layerPaint.removeLayer(this.tooltip);
    }
    if (this.layerPaint && this.layerPaintPathTemp) {
      this.layerPaint.removeLayer(this.layerPaintPathTemp);
    }

    //  clear everything
    this.restartPath();
  }
  restartPath() {
    this.distance = 0;
    this.lastCircle = undefined;
    this.lastPoint = undefined;
    this.tooltip = undefined;
    this.layerPaintPath = undefined;
    this.layerPaintPathTemp = undefined;

    //  flag to stop propagation events...
    this.isRestarted = true;
  }
  createCircle(latlng) {
    return new L.CircleMarker(latlng, {
      color: 'black',
      opacity: 1,
      weight: 1,
      fillColor: 'white',
      fill: true,
      fillOpacity: 1,
      radius: 4,
      clickable: Boolean(this.lastCircle),
    });
  }
  createTooltip(position) {
    const icon = L.divIcon({
      className: 'leaflet-measure-tooltip',
      iconAnchor: [-5, -5],
    });
    this.tooltip = L.marker(position, {
      icon,
      clickable: false,
    }).addTo(this.layerPaint);
  }
  updateTooltipPosition(position) {
    this.tooltip.setLatLng(position);
  }
  updateTooltipDistance(total, difference) {
    if (!this.tooltip._icon) {
      return;
    }
    const totalRound = this.formatDistance(total);
    const differenceRound = this.formatDistance(difference);

    let text = `<div class="leaflet-measure-tooltip-total">${totalRound}</div>`;
    if (differenceRound > 0 && totalRound !== differenceRound) {
      text += `<div class="leaflet-measure-tooltip-difference">(+${differenceRound})</div>`;
    }
    this.tooltip._icon.innerHTML = text;
  }
  formatDistance(val) {
    if (val < 1000) {
      return `${Math.round(val)}m`;
    }
    return `${Math.round((val / 1000) * 100) / 100}km`;
  }
  render() {
    return <Menu.Item ref={(elem) => { this.elem = elem; }} onClick={this.toggleMeasure} icon="arrows alternate horizontal" active={this.measuring} />;
  }
}
