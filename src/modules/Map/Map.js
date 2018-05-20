// #region imports
import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Map, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";

import Loading from "./components/Loading";
import MapControls from "./components/MapControls";
import Markers from "./components/Markers";

import {
  setMapZoom, setVehicleState, setSelectedVehicle, fetchVehicles,
} from "./Map.Actions";
import { setSidePanelVisibility, setActiveSidePanelTab } from "./../App/App.Actions";


import "./Map.scss";
// #endregion

const OSM_ATTRIBUTION = "<span class=\"copyright\">&copy;</span> <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

class MapModule extends React.Component {
    static propTypes = {
      state: propTypes.object.isRequired,
      dispatch: propTypes.object.isRequired,
    }

    constructor(props) {
      super(props);
      this.mapProps = this.mapProps.bind(this);
      this.initBounds = this.initBounds.bind(this);
    }
    state = { map: null }
    componentDidMount() {
      const { dispatch, user } = this.props;
      dispatch.fetchVehicles(user);
    }
    mapProps() {
      const { state, dispatch } = this.props;
      return {
        // center: [40.9747381, 29.23450307],
        zoom: state.map.zoom,
        zoomControl: false,
        onZoom: e => dispatch.setMapZoom(e.target._zoom),
        bounds: this.initBounds(),
        animate: true,
        ref: map => !this.state.map && this.setState({ map: map.leafletElement }),
      };
    }
    tileProps() {
      return { attribution: OSM_ATTRIBUTION, url: OSM_TILE_URL };
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
    render() {
      const { state, dispatch } = this.props;
      console.log(`i am render: ${this.initBounds()}`);
      return (
        <Map id="map-display" className={state.map.loading ? "loading" : ""} {...this.mapProps()}>
          <Loading active={state.map.loading} />
          <TileLayer {...this.tileProps()} />
          <MapControls map={this.state.map} bounds={this.initBounds()} />
          <Markers vehicles={state.map.vehicles} dispatch={dispatch} state={state} />
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
  },
});

export default connect(state2Props, dispatch2Props)(MapModule);
