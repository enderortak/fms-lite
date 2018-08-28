// #region imports
import Leaflet from "leaflet";
import propTypes from "prop-types";
import React from "react";
import { Map, FeatureGroup } from "react-leaflet";
import { connect } from "react-redux";
import { EditControl } from "react-leaflet-draw";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../../node_modules/leaflet-draw/dist/leaflet.draw.css";
import MapService from "./../../service/MapService";
import {
  fetchVehicles, setMapTile, setSelectedVehicle,
  toggleMapOverlay,
} from "./Map.Actions";
import "./Map.scss";
import Loading from "./components/Loading";
import MapControls from "./components/MapControls";
import Tiles from "./components/Tiles";
import Markers from "./components/Markers";
import AuthService from "../../service/AuthService";


// #endregion


const mapService = new MapService();
class MapModule extends React.Component {
  static propTypes = {
    handleInit: propTypes.func.isRequired,
    vehicles: propTypes.arrayOf(propTypes.object).isRequired,
    handleVehicleMarkerClick: propTypes.func.isRequired,
    selectedVehicle: propTypes.string,
    mapMode: propTypes.string.isRequired,
    handleMapClick: propTypes.func.isRequired,
    isLoading: propTypes.bool.isRequired,
    searchMarker: propTypes.object,
    handleMapTileChange: propTypes.func.isRequired,
    handleMapOverlayChange: propTypes.func.isRequired,
    activeMapTile: propTypes.string.isRequired,
    activeOverlays: propTypes.arrayOf(propTypes.string).isRequired,
  }
  static defaultProps = {
    selectedVehicle: null,
    searchMarker: null,
  }
  constructor(props) {
    super(props);
    this.calculateInitialBounds = this.calculateInitialBounds.bind(this);
    this.handleViewportReset = this.handleViewportReset.bind(this);
    this.handleViewportChange = this.handleViewportChange.bind(this);
  }

  componentDidMount() {
    this.props.handleInit();
    console.info("Map initialized", (new Date()).toUTCString());
  }

  handleRef = (mapComponent) => {
    if (mapComponent) {
      MapService._map = mapComponent.leafletElement; window.map = mapComponent.leafletElement;
    }
  }
  handleViewportReset = () => mapService.setBounds(this.calculateInitialBounds());
  handleZoomIn = () => mapService.zoomIn();
  handleZoomOut = () => mapService.zoomOut();
  handleMenuClick = e => mapService.stopMapEvents(e);
  handleViewportChange = () => this.forceUpdate();

  calculateInitialBounds() {
    const { vehicles } = this.props;
    if (vehicles.length === 0) return Leaflet.latLngBounds([[60, -130], [-30, 150]]);
    const latArr = vehicles.map(i => i.lat);
    const longArr = vehicles.map(i => i.long);
    return [
      [Math.min(...latArr), Math.min(...longArr)],
      [Math.max(...latArr), Math.max(...longArr)],
    ];
  }

  render() {
    const
      {
        vehicles, handleVehicleMarkerClick, selectedVehicle, mapMode, handleMapClick,
        isLoading, searchMarker, handleMapTileChange, handleMapOverlayChange, activeMapTile, activeOverlays,
      } = this.props;
    const mapProps = {
      id: "map-display",
      zoomControl: false,
      maxZoom: 18,
      minZoom: 3,
      bounds: this.calculateInitialBounds(),
      animate: true,
      ref: this.handleRef,
      onClick: handleMapClick,
      onZoomEnd: this.handleViewportChange,
      onMoveEnd: this.handleViewportChange,
    };
    const mapControlProps = {
      mapTiles: MapService.tiles,
      mapOverlays: MapService.overlays,
      activeMapTile,
      activeOverlays,
      mapWidth: mapService.getMapWidthInKilometers(),
      onZoomIn: this.handleZoomIn,
      onZoomOut: this.handleZoomOut,
      onViewportReset: this.handleViewportReset,
      onMapTileChange: handleMapTileChange,
      onMapOverlayChange: handleMapOverlayChange,
      onMenuClick: this.handleMenuClick,
    };
    const tilesProps = {
      mapTile: MapService.tiles.filter(i => i.name === activeMapTile)[0],
      overlays: MapService.overlays.filter(i => activeOverlays.includes(i.name)),
    };
    const markerProps = {
      mapMode,
      vehicles,
      selectedVehicle,
      searchMarker,
      onVehicleMarkerClick: handleVehicleMarkerClick,
    };
    return (
      <Map {...mapProps}>
        <Loading active={isLoading} />
        <MapControls {...mapControlProps} />
        <Tiles {...tilesProps} />
        <Markers {...markerProps} />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={e => console.log(e)}
            draw={{
            rectangle: false,
          }}
          />
        </FeatureGroup>
      </Map>
    );
  }
}
const state2Props = state => ({
  mapMode: state.playback.isActive ? "playback" : "default",
  vehicles: state.map.vehicles,
  selectedVehicle: state.map.selectedVehicle,
  activeMapTile: state.map.mapTile,
  activeOverlays: Object.keys(state.map.overlays).filter(i => state.map.overlays[i]),
  isLoading: state.map.loading,
  searchMarker: state.map.searchMarker,
});
const dispatch2Props = dispatch => ({
  handleVehicleMarkerClick: vin => dispatch(setSelectedVehicle(vin)),
  handleMapClick: () => dispatch(setSelectedVehicle(null)),
  handleInit: () => {
    const auth = new AuthService();
    return dispatch(fetchVehicles(auth.getUser().username));
  },
  handleMapTileChange: mapTileName => dispatch(setMapTile(mapTileName)),
  handleMapOverlayChange: overlayName => dispatch(toggleMapOverlay(overlayName)),
});

export default connect(state2Props, dispatch2Props)(MapModule);
