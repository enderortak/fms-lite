
import L from "leaflet";
import "leaflet-providers";
import { OSMMapTile, HEREMapTile, HEREOverlay } from "./MapTileProviders";

export default class MapService {
    static _map = null;
    stopMapEvents(e) {
      L.DomEvent.stop(e);
    }
    stopPropagation(e) {
      L.DomEvent.stopPropagation(e);
    }
    preventDefault(e) {
      L.DomEvent.preventDefault(e);
    }
    zoomIn() {
      MapService._map.zoomIn();
    }
    zoomOut() {
      MapService._map.zoomOut();
    }
    setBounds(viewport) {
      MapService._map.fitBounds(viewport);
    }
    setView(latlng, zoom) {
      MapService._map.setView(latlng, zoom);
    }
    setCenter(latlng) {
      MapService._map.panTo(latlng);
    }
    switchMapTile(tile) {
      const layers = Object.keys(MapService._map._layers).map(i => MapService._map._layers[i]);
      layers.filter(i => i.options.layerType === "map-tile").forEach(i => MapService._map.removeLayer(i));
      tile.addTo(MapService._map);
    }
    switchOverlay(overlay) {
      overlay.addTo(MapService._map);
    }
    // normal.day
    // normal.day.grey
    // normal.day.transit
    // normal.night.transit
    // normal.day.custom
    // normal.night
    // normal.night.grey
    static mapTiles = {
      osm: {
        label: "Sokak Görünümü (OSM)",
        tile: new OSMMapTile({ name: "osm", layerType: "map-tile" }),
      },
      "here.normal.day": {
        label: "Sokak Görünümü (HERE)",
        tile: new HEREMapTile("normal.day", { name: "here.normal.day", layerType: "map-tile" }),
      },
      "here.normal.day.transit": {
        label: "Sokak Görünümü - t (HERE)",
        tile: new HEREMapTile("normal.day.transit", { name: "here.normal.day.transit", layerType: "map-tile" }),
      },
      "here.hybrid.day": {
        type: "map-tile",
        label: "Uydu-Sokak Hibrit Görünüm (HERE)",
        tile: new HEREMapTile("hybrid.day", { base: "aerial", name: "here.hybrid.day", type: "map-tile" }),
      },
      "otm.topo": {
        type: "map-tile",
        label: "Topoğrafik Harita (OTM)",
        tile: L.tileLayer.provider("OpenTopoMap"),
      },
    }
    static mapOverlays = {
      traffic: {
        label: "Trafik (HERE)",
        overlay: new HEREOverlay("traffic"),
      },
    }
}

