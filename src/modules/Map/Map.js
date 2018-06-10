// #region imports
import Leaflet from "leaflet";
import propTypes from "prop-types";
import React from "react";
import { Map } from "react-leaflet";
import { connect } from "react-redux";
import "../../../node_modules/leaflet/dist/leaflet.css";
import MapService from "./../../service/MapService";
import { setActiveSidePanelTab, setSidePanelVisibility } from "./../App/App.Actions";
import { fetchVehicles, setMapTile, setMapZoom, setSelectedVehicle, setVehicleState, toggleMapOverlay } from "./Map.Actions";
import "./Map.scss";
import Loading from "./components/Loading";
import MapControls from "./components/MapControls";
import MapTiles from "./components/MapTiles";
import VehicleMarkers from "./components/VehicleMarkers";
import SearchMarker from "./components/markers/SearchMarker";


// #endregion


class MapModule extends React.Component {
    static propTypes = {
      state: propTypes.object.isRequired,
      dispatch: propTypes.object.isRequired,
    }

    constructor(props) {
      super(props);
      this.mapProps = this.mapProps.bind(this);
      this.initBounds = this.initBounds.bind(this);
      // this.mapControls = this.mapControls.bind(this);
    }
    componentDidMount() {
      const { state, dispatch, user } = this.props;
      dispatch.fetchVehicles(user);
      this.map = this.mapComp.leafletElement;
      MapService._map = this.mapComp.leafletElement;
      window._map = this.mapComp.leafletElement;
    }
    mapProps() {
      const { state, dispatch } = this.props;
      return {
        zoom: state.map.zoom,
        zoomControl: false,
        onZoom: e => dispatch.setMapZoom(e.target._zoom),
        maxZoom: 18,
        minZoom: 3,
        bounds: this.initBounds(),
        animate: true,
        ref: (map) => { this.mapComp = map; },
        onClick: e => dispatch.setSelectedVehicle(null),

      };
    }

    initBounds() {
      const { vehicles } = this.props.state.map;
      if (vehicles.length === 0) return Leaflet.latLngBounds([[60, -130], [-30, 150]]);
      const latArr = vehicles.map(i => i.lat);
      const longArr = vehicles.map(i => i.long);
      return Leaflet.latLngBounds([
        [Math.min(...latArr), Math.min(...longArr)],
        [Math.max(...latArr), Math.max(...longArr)],
      ]);
    }
    // mapControls() {
    //   const map = new MapService();
    //   const { dispatch } = this.props;
    //   return {
    //     zoomIn: (e) => { map.stopMapEvents(e); map.zoomIn(); },
    //     zoomOut: (e) => { map.stopMapEvents(e); map.zoomOut(); },
    //     resetViewport: (e) => { map.stopMapEvents(e); map.setBounds(this.initBounds()); },
    //     setMapTile: (e, tileName) => { map.stopMapEvents(e); dispatch.setMapTile(tileName); },
    //     toggleMapOverlay: (e, overlayName) => { map.stopMapEvents(e); dispatch.toggleMapOverlay(overlayName); },
    //   };
    // }
    render() {
      const { state, dispatch } = this.props;
      console.log(state);
      const { loading } = state.map;
      console.log(`i am render: ${state.map.bounds}`);
      return (
        <Map id="map-display" {...this.mapProps()}>
          <Loading active={loading} />
          <MapControls state={state} dispatch={dispatch} />
          <MapTiles state={state} />
          <VehicleMarkers dispatch={dispatch} state={state} />
          {state.map.searchMarker && <SearchMarker searchMarker={state.map.searchMarker} /> }
        </Map>
      );
    }
}

const state2Props = state => ({ state });
const dispatch2Props = dispatch => ({
  dispatch: {
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    setSelectedVehicle: vehicleId => dispatch(setSelectedVehicle(vehicleId)),
    setVehicleState: (vehicle, state) => dispatch(setVehicleState(vehicle, state)),
    fetchVehicles: user => dispatch(fetchVehicles(user)),
    setSidePanelVisibility: value => dispatch(setSidePanelVisibility(value)),
    setActiveSidePanelTab: tabIndex => dispatch(setActiveSidePanelTab(tabIndex)),
    setMapTile: mapTileName => dispatch(setMapTile(mapTileName)),
    toggleMapOverlay: overlayName => dispatch(toggleMapOverlay(overlayName)),
  },
});

export default connect(state2Props, dispatch2Props)(MapModule);
