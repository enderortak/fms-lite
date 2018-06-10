
import L from "leaflet";
import "leaflet-providers";
import initMeasurePlugin from "./../util/leaflet.measure";
import { HEREMapTile, HEREOverlay, OSMMapTile } from "./MapTileProviders";


export default class MapService {
    static _map = null;

    constructor() {
      initMeasurePlugin();
    }
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
    showOverlay(overlayName) {
      MapService.mapOverlays[overlayName].overlay.addTo(MapService._map);
    }
    hideOverlay(overlayName) {
      MapService.mapOverlays[overlayName].overlay.removeFrom(MapService._map);
    }
    getMetersPerPixel() {
      return (
        40075016.686 *
        (
          Math.abs(Math.cos((MapService._map.getCenter().lat * 180) / Math.PI))
          /
          ((MapService._map.getZoom() + 8) ** 2)
        )
      );
    }
    getMapWidthInKilometers() {
      // return Math.round((MapService._map.getSize().y * this.getMetersPerPixel()) / 1000);

      const center = MapService._map.getCenter();
      const westLong = MapService._map.getBounds().getWest();
      const west = L.latLng({ lat: center.lat, lng: westLong });
      return Math.round((west.distanceTo(center) * 2) / 1000);
    }
    measureControl(toggleMeasure) {
      return L.control.measure({ toggleMeasure });
    }
    static mapTiles = {
      osm: {
        label: "Sokak Görünümü (OSM)",
        tile: new OSMMapTile({ name: "osm", layerType: "map-tile" }),
      },
      "here.normal.day": {
        label: "Sokak Görünümü (HERE)",
        tile: new HEREMapTile("normal.day", { name: "here.normal.day", layerType: "map-tile" }),
      },
      "here.satellite.day": {
        label: "Uydu Görünümü (HERE)",
        tile: new HEREMapTile("satellite.day", { base: "aerial", name: "here.satellite.day", layerType: "map-tile" }),
      },
      "here.hybrid.day": {
        label: "Uydu-Sokak Hibrit Görünüm (HERE)",
        tile: new HEREMapTile("hybrid.day", { base: "aerial", name: "here.hybrid.day", layerType: "map-tile" }),
      },
      "here.terrain.day": {
        label: "Topoğrafik Görünüm (HERE)",
        tile: new HEREMapTile("terrain.day", { base: "aerial", name: "here.terrain.day", layerType: "map-tile" }),
      },
    }
    static mapOverlays = {
      traffic: {
        label: "Trafik (HERE)",
        overlay: new HEREOverlay("traffic"),
      },
    }
}

