import React from "react";
import ApiService, { fetchApi } from "./../../service/ApiService";
import NotificationService from "./../../service/NotificationService";
import TutorialNotification from "./components/TutorialNotification";

const notify = new NotificationService();

export const SET_SELECTED_VEHICLE = "SET_SELECTED_VEHICLE";
export const SET_VEHICLE_STATE = "SET_VEHICLE_STATE";
export const SET_MAP_ZOOM = "SET_MAP_ZOOM";

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

export const setSelectedVehicle =
vehicleId => ({ type: SET_SELECTED_VEHICLE, vehicleId });
export const setMapZoom =
    zoom => ({ type: SET_MAP_ZOOM, zoom });
export const setVehicleState = (vehicle, state) =>
  ({ type: SET_VEHICLE_STATE, vehicle, state });

