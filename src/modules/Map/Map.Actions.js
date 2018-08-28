
import ApiService from "./../../service/ApiService";
import NotificationService from "./../../service/NotificationService";
import AuthService from "../../service/AuthService";
import { setSidePanelVisibility, setActiveSidePanelTab } from "./../App/App.Actions";


const notify = new NotificationService(); // eslint-disable-line

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


export const fetchVehicles = callback => (dispatch) => {
  dispatch(fetchVehiclesBegin());
  const vehicleApi = ApiService.vehicle;
  const auth = new AuthService();
  vehicleApi.getByUser(auth.getUser().username)
    .then((result) => {
      dispatch(fetchVehiclesSuccess(result));
      if (callback && typeof callback === "function") callback();
      // notify.simple(<TutorialNotification />, { type: "info", autoClose: false, closeOnClick: false });
      return result;
    })
    .catch(error => dispatch(fetchVehiclesFailure(error)));
};
const fetchVehiclesBegin = () => ({ type: FETCH_VEHICLES_BEGIN });
const fetchVehiclesSuccess = vehicles => ({ type: FETCH_VEHICLES_SUCCESS, vehicles });
const fetchVehiclesFailure = error => ({ type: FETCH_VEHICLES_FAILURE, error });

export const setSelectedVehicle = (vin, latlon) => (dispatch) => {
  if (latlon) {
    dispatch(setMapCenter(latlon));
    dispatch(setMapZoom(17));
  }
  if (vin) {
    dispatch(setSidePanelVisibility(true));
    dispatch(setActiveSidePanelTab(0));
  }
  dispatch(({ type: SET_SELECTED_VEHICLE, vin }));
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

