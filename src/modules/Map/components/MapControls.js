import propTypes from "prop-types";
import React from "react";
import Control from "react-leaflet-control";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import MapService from "../../../service/MapService";
import MeasureControl from "./../../Measure/Measure";
import "./MapControls.scss";

const map = new MapService();
export default class MapControls extends React.Component {
  constructor(props) {
    super(props);
    this.setMapTile = this.setMapTile.bind(this);
    this.toggleMapOverlay = this.toggleMapOverlay.bind(this);
    this.measure = map.measureControl(this.toggleMeasure);
    this.toggleMeasure = this.toggleMeasure.bind(this);
    this.state = { measuring: false };
  }
  setMapTile(e, tileName) {
    map.stopMapEvents(e);
    this.props.dispatch.setMapTile(tileName);
  }
  toggleMapOverlay(e, overlayName) {
    map.stopMapEvents(e);
    this.props.dispatch.toggleMapOverlay(overlayName);
  }
  zoomIn(e) {
    map.stopMapEvents(e);
    map.zoomIn();
  }
  zoomOut(e) {
    map.stopMapEvents(e);
    map.zoomOut();
  }
  resetViewport(e) {
    map.stopMapEvents(e);
    map.setBounds(this.initBounds());
  }
  toggleMeasure(e) {
    if (e) map.stopMapEvents(e);
    this.measure._measuring = !this.measure._measuring;
    if (this.measure._measuring) {
      this.setState({ measuring: true });
      this.measure._startMeasuring();
    } else {
      this.setState({ measuring: false });
      this.measure._stopMeasuring();
    }
  }
  render() {
    const { state } = this.props;
    const {
      zoomIn, zoomOut, resetViewport, setMapTile, toggleMapOverlay, toggleMeasure,
    } = this;
    return (
      <Control position="bottomleft">
        <Menu icon compact color="grey" inverted style={{ opacity: "0.8" }}>
          <Menu.Item as="a" onClick={zoomIn}>
            <Icon name="plus" />
          </Menu.Item>
          <Menu.Item as="a" onClick={zoomOut}>
            <Icon name="minus" />
          </Menu.Item>
          <Menu.Item as="a" onClick={resetViewport}>
            <Icon name="undo" />
          </Menu.Item>
          <Dropdown item icon="map outline" upward inline>
            <Dropdown.Menu>
              <Dropdown.Header>HARİTALAR</Dropdown.Header>
              {
                Object.keys(MapService.mapTiles).map(i => (<Dropdown.Item
                  key={i}
                  onClick={(e) => { setMapTile(e, i); }}
                  content={MapService.mapTiles[i].label}
                  active={state.map.mapTile === i}
                  icon={state.map.mapTile === i ? "checkmark" : ""}
                />))
              }
              <Dropdown.Header>KAPLAMALAR</Dropdown.Header>
              {
                Object.keys(MapService.mapOverlays).map(i =>
                  (<Dropdown.Item
                    key={MapService.mapOverlays[i].label}
                    onClick={(e) => { toggleMapOverlay(e, i); }}
                    content={MapService.mapOverlays[i].label}
                    active={state.map.overlays[i]}
                    icon={state.map.overlays[i] ? "checkmark" : ""}
                  />))
              }
            </Dropdown.Menu>
          </Dropdown>
          <MeasureControl />
          <Menu.Item>{map.getMapWidthInKilometers()} km</Menu.Item>

        </Menu>
      </Control>
    );
  }
}

MapControls.propTypes = {
  state: propTypes.object.isRequired,
  dispatch: propTypes.object.isRequired,
};
