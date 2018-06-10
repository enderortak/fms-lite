import "leaflet-providers";
import React from "react";
import MapService from "../../../service/MapService";

export default class MapTiles extends React.Component {
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


// const getTileProps = (latlon, zoom) => ({
//   osm: {
//     attribution: "<span class=\"copyright\">&copy;</span> <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
//     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   },
//   yandex: {
//     attribution: "<span class=\"copyright\">&copy;</span> <a href=&quot;http://osm.org/copyright&quot;>YandexMap</a> contributors",
//     url: "http://vec04.maps.yandex.net/tiles?l=map&v=2.26.0&x={x*2}&y={y}&z={z}&lang=tr-TR",
//   },
// });
