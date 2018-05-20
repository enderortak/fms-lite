import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import L from "leaflet";
import { MapControl } from "react-leaflet";
import { Menu, Icon } from "semantic-ui-react";

class MapControlPane extends MapControl {
  componentWillMount() {
    const controlPane = L.control({ position: "bottomleft" });
    const jsx = (
      <div {...this.props}>
        {this.props.children}
      </div>
    );

    controlPane.onAdd = (map) => {
      const div = L.DomUtil.create("div", "");
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = controlPane;
  }
}

const MapControls = ({ map, bounds }) => (
  <MapControlPane>
    <Menu icon compact color="grey" inverted style={{ opacity: "0.8" }}>
      <Menu.Item as="a" onClick={(e) => { L.DomEvent.stop(e); map.zoomIn(); }}>
        <Icon name="plus" />
      </Menu.Item>
      <Menu.Item as="a" onClick={(e) => { L.DomEvent.stop(e); map.zoomOut(); }}>
        <Icon name="minus" />
      </Menu.Item>
      <Menu.Item as="a" onClick={(e) => { /* L.DomEvent.stop(e); map.fitBounds(bounds); */ console.log(bounds); }}>
        <Icon name="undo" />
      </Menu.Item>

      {// <Menu.Item>{this.metersPerPixel}</Menu.Item>
    }
    </Menu>
  </MapControlPane>
);
MapControls.propTypes = {
  map: propTypes.object,
};
MapControls.defaultProps = {
  map: null,
};
export default MapControls;
