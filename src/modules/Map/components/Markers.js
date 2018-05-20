import React from "react";
import propTypes from "prop-types";
import { Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import markerIconFactory from "./../markers/markerIconFactory";

import "../../../../node_modules/react-leaflet-markercluster/dist/styles.min.css";


const Markers = ({ vehicles, dispatch }) => (
  <MarkerClusterGroup>
    {
    vehicles.map(v => (
      <Marker
        position={[v.lat, v.long]}
        icon={markerIconFactory(3, false)}
        key={v.vehicleId}
        onclick={() => {
          dispatch.setSelectedVehicle(v.vehicleId);
          dispatch.setSidePanelVisibility(true);
          dispatch.setActiveSidePanelTab(1);
        }}
      />
    ))
}
  </MarkerClusterGroup>
);
Markers.propTypes = {
  vehicles: propTypes.arrayOf(propTypes.object).isRequired,
};
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
export default Markers;
