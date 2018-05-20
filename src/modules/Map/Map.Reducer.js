import {
  SET_SELECTED_VEHICLE, SET_MAP_ZOOM, SET_VEHICLE_STATE,
  FETCH_VEHICLES_BEGIN, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_FAILURE,
} from "./Map.Actions";


const mapInitState = {
  vehicles: [],
  selectedVehicle: null,
  zoom: 15,
  loading: false,
};

const mapReducer = (actualState = mapInitState, action) => {
  switch (action.type) {
    case SET_SELECTED_VEHICLE:
      return ({ ...actualState, selectedVehicle: action.vehicleId });
    case SET_MAP_ZOOM:
      return ({
        ...actualState,
        zoom: action.zoom,
      });
    case SET_VEHICLE_STATE:
      return ({
        ...actualState,
        vehicles: [
          ...actualState.vehicles.filter(i => i.vin !== action.vehicle.vin),
          { ...action.vehicle, state: action.state },
        ],
      });
    case FETCH_VEHICLES_BEGIN:
      return ({
        ...actualState,
        loading: true,
      });
    case FETCH_VEHICLES_SUCCESS:
      return ({
        ...actualState,
        loading: false,
        vehicles: action.vehicles,
      });
    case FETCH_VEHICLES_FAILURE:
      console.log(action.error);
      return ({
        ...actualState,
        loading: false,
        error: action.error.message,
      });
    default: return actualState;
  }
};


export default mapReducer;

