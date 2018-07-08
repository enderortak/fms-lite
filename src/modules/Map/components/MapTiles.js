import "leaflet-providers";
import propTypes from "prop-types";
import React from "react";
import MapService from "../../../service/MapService";

export default class MapTiles extends React.Component {
  static propTypes = {
    state: propTypes.object.isRequired,
  }
  componentDidMount() {
    const map = new MapService();
    const { state } = this.props;
    if (MapService._map) {
      map.switchMapTile(MapService.mapTiles[state.map.mapTile].tile);
      Object.keys(this.props.state.map.overlays).forEach((i) => {
        if (this.props.state.map.overlays[i]) map.showOverlay(i);
      });
    }
  }
  componentDidUpdate(prevProps) {
    const map = new MapService();
    if (this.props.state.map.mapTile !== prevProps.state.map.mapTile) {
      map.switchMapTile(MapService.mapTiles[this.props.state.map.mapTile].tile);
    }
    Object.keys(this.props.state.map.overlays).forEach((i) => {
      if (this.props.state.map.overlays[i] !== prevProps.state.map.overlays[i]) {
        if (this.props.state.map.overlays[i]) map.showOverlay(i);
        else map.hideOverlay(i);
      }
    });
  }
  render() {
    return null;
  }
}
