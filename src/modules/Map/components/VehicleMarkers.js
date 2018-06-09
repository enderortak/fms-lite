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
        selected={state.map.selectedVehicle === v.vehicleId}
        position={[v.lat, v.long]}
        key={v.vehicleId}
        title={v.plate}
        onclick={() => {
          dispatch.setSelectedVehicle(v.vehicleId);
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
export const VehicleStates = {
  ENGINE_OFF: 0,
  IDLING: 1,
  IDLING_VIOLATION: 2,
  MOVING: 3,
  NO_GPS: 4,
  NO_CONNECTION_SHORT: 5,
  NO_CONNECTION_LONG: 6,
  UNKNOWN: 99,
};
export default VehicleMarkers;
