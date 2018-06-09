import React from "react";
import ApiService, { fetchApi } from "./../../service/ApiService";
import NotificationService from "./../../service/NotificationService";
import TutorialNotification from "./components/TutorialNotification";

const notify = new NotificationService();

export const SET_MAP_TILE = "SET_MAP_TILE";
export const TOGGLE_MAP_OVERLAY = "TOGGLE_MAP_OVERLAY";
export const SET_SELECTED_VEHICLE = "SET_SELECTED_VEHICLE";
export const SET_VEHICLE_STATE = "SET_VEHICLE_STATE";
export const SET_MAP_ZOOM = "SET_MAP_ZOOM";
export const SET_MAP_CENTER = "SET_MAP_CENTER";
export const SET_MAP_BOUNDS = "SET_MAP_BOUNDS";
export const SET_SEARCH_MARKER = "SET_SEARCH_MARKER";
export const DISMISS_SEARCH_MARKER = "DISMISS_SEARCH_MARKER";

export const FETCH_VEHICLES_BEGIN = "FETCH_VEHICLES_BEGIN";
export const FETCH_VEHICLES_SUCCESS = "FETCH_VEHICLES_SUCCESS";
export const FETCH_VEHICLES_FAILURE = "FETCH_VEHICLES_FAILURE";


export const fetchVehicles = user => (dispatch) => {
  dispatch(fetchVehiclesBegin());
  const api = new ApiService();
  api.fetch(`vehicles/${user.username}`, "GET")
    .then((result) => {
      setTimeout(() => {
        dispatch(fetchVehiclesSuccess(result));
        notify.simple(<TutorialNotification />, { type: "info", autoClose: false, closeOnClick: false });
        return result;
      }, 2000);
    })
    .catch(error => dispatch(fetchVehiclesFailure(error)));
};
const fetchVehiclesBegin = () => ({ type: FETCH_VEHICLES_BEGIN });
const fetchVehiclesSuccess = vehicles => ({ type: FETCH_VEHICLES_SUCCESS, vehicles });
const fetchVehiclesFailure = error => ({ type: FETCH_VEHICLES_FAILURE, error });

export const setSelectedVehicle = (vehicleId, latlon) => (dispatch) => {
  if (latlon) {
    dispatch(setMapCenter(latlon));
    dispatch(setMapZoom(17));
  }
  dispatch(({ type: SET_SELECTED_VEHICLE, vehicleId }));
};

export const setMapZoom =
    zoom => ({ type: SET_MAP_ZOOM, zoom });
export const setVehicleState = (vehicle, state) =>
  ({ type: SET_VEHICLE_STATE, vehicle, state });
export const setMapTile = mapTileName => ({ type: SET_MAP_TILE, mapTileName });
export const toggleMapOverlay = overlayName => ({ type: TOGGLE_MAP_OVERLAY, overlayName });
export const setMapCenter = latlon => ({ type: SET_MAP_CENTER, latlon });
export const setMapBounds = (corner1, corner2) => ({ type: SET_MAP_BOUNDS, corner1, corner2 });
export const setSearchMarker = (label, latlon) => ({ type: SET_SEARCH_MARKER, label, latlon });
export const dismissSearchMarker = () => ({ type: DISMISS_SEARCH_MARKER });
