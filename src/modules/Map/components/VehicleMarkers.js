import React from "react";
import propTypes from "prop-types";

import MarkerClusterGroup from "react-leaflet-markercluster";

import VehicleMarker from "./markers/VehicleMarker";

import "../../../../node_modules/react-leaflet-markercluster/dist/styles.min.css";
import MapService from "../../../service/MapService";


const VehicleMarkers = ({ state, dispatch }) => (
  <MarkerClusterGroup>
    {
    state.map.vehicles.map(v => (
      <VehicleMarker
        selected={state.map.selectedVehicle === v.vin}
        position={[v.lat, v.long]}
        key={v.vin}
        title={v.plate}
        onclick={() => {
          dispatch.setSelectedVehicle(v.vin);
          dispatch.setSidePanelVisibility(true);
          dispatch.setActiveSidePanelTab(0);
          const map = new MapService();
          map.setCenter([v.lat, v.long]);
        }}
      />
    ))
}
  </MarkerClusterGroup>
);
VehicleMarkers.propTypes = {
  state: propTypes.object.isRequired,
  dispatch: propTypes.object.isRequired,
};
export default VehicleMarkers;
