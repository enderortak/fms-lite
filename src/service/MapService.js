
import L from "leaflet";
import { antPath } from 'leaflet-ant-path';
import "./../xtLib/LeafletPlayback";
import initMeasurePlugin from "./../util/leaflet.measure";
import TileService from "./TileService";

export default class MapService {
    static _map = null;
    static _mapOptions = { zoomControl: false }
    initMap(options) {
      const map = L.map("map-display", options);
      MapService._map = map;
      this.addTile("osm");
      map.fitBounds(options.bounds);
      map.on("zoom", options.onZoom);
      map.on("click", options.onClick);
    }
    map() {
      const map = MapService._map;
      if (map) map.layers = () => (map._layers);
      return map;
    }

    addMarker = (latLong, options) => L.marker(latLong, options).addTo(this.map());
    addAntPath = (latLongs, options) => antPath(latLongs, options).addTo(this.map());
    createVehicleIcon = () => L.divIcon({ html: '<div class="notSelected vehicle-marker"></div>' });
    addPopup = (latLong, content) => L.popup()
      .setLatLng(latLong)
      .setContent(content)
      .openOn(this.map());
    constructor() {
      initMeasurePlugin();
    }
    initPlayback(geoJSON, callback) {
      return new L.Playback(MapService._map, geoJSON, callback, {
        tracksLayer: false,
        playControl: false,
        dateControl: false,
        tickLen: 1000,
        speed: 10000000,
      });
    }
    initPlaybackTrackLayer(geoJSON) {
      const layerOptions = {
        pointToLayer: (featureData, latlng) =>
          new L.CircleMarker(latlng, {
            stroke: false,
            fill: true,
            radius: 5,
            fillColor: "#3388ff",
            fillOpacity: 0.7,
          }),
      };
      const layer = L.geoJSON(geoJSON, layerOptions).addTo(MapService._map);
      return layer;
    }
    removeLayer(layer) { MapService._map.removeLayer(layer); }

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
      MapService._map.fitBounds(L.latLngBounds(viewport));
    }
    setView(latlng, zoom) {
      MapService._map.setView(latlng, zoom);
    }
    setCenter(latlng) {
      MapService._map.panTo(latlng);
    }
    flyTo(latlng) {
      MapService._map.flyTo(latlng);
    }

    showOverlay(overlayName) {
      MapService.overlays[overlayName].overlay.addTo(MapService._map);
    }
    hideOverlay(overlayName) {
      MapService.overlays[overlayName].overlay.removeFrom(MapService._map);
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
      if (this.map()) {
        const center = this.map().getCenter();
        const westLong = MapService._map.getBounds().getWest();
        const west = L.latLng({ lat: center.lat, lng: westLong });
        return Math.round((west.distanceTo(center) * 2) / 1000);
      }
      return 0;
    }
    measureControl(toggleMeasure) {
      return L.control.measure({ toggleMeasure });
    }

    static tiles = [
      {
        name: "osm",
        label: "Sokak Görünümü (OSM)",
        options: TileService.getOptions("osm"),
      },
      {
        name: "here.normal.day",
        label: "Sokak Görünümü (HERE)",
        options: TileService.getOptions("here.normal.day"),
      },
      {
        name: "here.satellite.day",
        label: "Uydu Görünümü (HERE)",
        options: TileService.getOptions("here.satellite.day"),
      },
      {
        name: "here.hybrid.day",
        label: "Uydu-Sokak Hibrit Görünüm (HERE)",
        options: TileService.getOptions("here.hybrid.day"),
      },
      {
        name: "here.terrain.day",
        label: "Topoğrafik Görünüm (HERE)",
        options: TileService.getOptions("here.terrain.day"),
      },
    ]
    static overlays = [
      {
        name: "here.terrain.day",
        label: "Trafik (HERE)",
        options: TileService.getOptions("here.traffic"),
      },
    ]
}

