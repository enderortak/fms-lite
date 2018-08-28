import React from "react";
import propTypes from "prop-types";

import MarkerClusterGroup from "react-leaflet-markercluster";
import VehicleMarker from "./VehicleMarker";
import SearchMarker from "./SearchMarker";
import "../../../../node_modules/react-leaflet-markercluster/dist/styles.min.css";
import MapService from "../../../service/MapService";

const VehicleMarkers = (vehicles, selectedVehicle, onVehicleMarkerClick) => {
  const vehicleMarkerProps = vehicle => ({
    selected: selectedVehicle === vehicle.vin,
    position: [vehicle.lat, vehicle.long],
    key: vehicle.vin,
    title: vehicle.plate,
    onclick: () => {
      onVehicleMarkerClick(vehicle.vin);
      const map = new MapService();
      map.setCenter([vehicle.lat, vehicle.long]);
    },
  });
  return (
    <MarkerClusterGroup>
      { vehicles.map(v => (<VehicleMarker {...vehicleMarkerProps(v)} />)) }
    </MarkerClusterGroup>
  );
};

const Markers = ({
  mapMode, vehicles, selectedVehicle, onVehicleMarkerClick,
  playbackMarkerPosition, searchMarker,
}) => (
  <React.Fragment>
    {
        mapMode === "default" &&
        VehicleMarkers(vehicles, selectedVehicle, onVehicleMarkerClick)
    }
    {
        mapMode === "playback" && playbackMarkerPosition &&
        <VehicleMarker selected={false} position={playbackMarkerPosition} />
    }
    {
        searchMarker && <SearchMarker searchMarker={searchMarker} />
    }
  </React.Fragment>
);
Markers.propTypes = {
  mapMode: propTypes.string.isRequired,
  vehicles: propTypes.arrayOf(propTypes.object).isRequired,
  selectedVehicle: propTypes.string,
  onVehicleMarkerClick: propTypes.func.isRequired,
  playbackMarkerPosition: propTypes.arrayOf(propTypes.number.isRequired, propTypes.number.isRequired),
  searchMarker: propTypes.object,
};
Markers.defaultProps = {
  playbackMarkerPosition: null, selectedVehicle: null, searchMarker: null, playbackPath: null,
};
export default Markers;
