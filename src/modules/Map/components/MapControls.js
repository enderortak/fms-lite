import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import L from "leaflet";
import { MapControl } from "react-leaflet";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import MapService from "../../../service/MapService";
import "./MapControls.scss";

class MapControlPane extends MapControl {
  componentWillMount() {
    const controlPane = L.control({ position: "bottomleft" });
    const jsx = (
      <div {...this.props}>
        {this.props.children}
      </div>
    );

    controlPane.onAdd = () => {
      const div = L.DomUtil.create("div", "");
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = controlPane;
  }
}
const m = new MapService();
const MapControls = ({
  state, zoomIn, zoomOut, resetViewport, setMapTile, switchOverlay,
}) => (
  <MapControlPane>
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
      <Dropdown item icon="map" upward inline>
        <Dropdown.Menu>
          <Dropdown.Header>HARİTALAR</Dropdown.Header>
          {
            Object.keys(MapService.mapTiles).map(i =>
              (<Dropdown.Item
                key={MapService.mapTiles[i].label}
                onMouseDown={(e) => { setMapTile(e, i); }}
                content={MapService.mapTiles[i].label}
                active={state.map.mapTile === i}
              />))
          }
          <Dropdown.Header>KAPLAMALAR</Dropdown.Header>
          {
            Object.keys(MapService.mapOverlays).map(i =>
              (<Dropdown.Item
                key={MapService.mapOverlays[i].label}
                onMouseDown={(e) => { switchOverlay(e, MapService.mapOverlays[i].overlay); }}
                content={MapService.mapOverlays[i].label}
              />))
          }
        </Dropdown.Menu>
      </Dropdown>
      {// <Menu.Item>{this.metersPerPixel}</Menu.Item>
    }
    </Menu>
  </MapControlPane>
);
MapControls.propTypes = {
  zoomIn: propTypes.func.isRequired,
  zoomOut: propTypes.func.isRequired,
  resetViewport: propTypes.func.isRequired,
};
export default MapControls;
