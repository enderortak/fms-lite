import {
  SET_SELECTED_VEHICLE, SET_MAP_ZOOM, SET_VEHICLE_STATE,
  FETCH_VEHICLES_BEGIN, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_FAILURE,
  SET_MAP_CENTER, SET_MAP_BOUNDS, SET_SEARCH_MARKER, DISMISS_SEARCH_MARKER,
  SET_MAP_TILE, TOGGLE_MAP_OVERLAY,
} from "./Map.Actions";


const mapInitState = {
  vehicles: [],
  selectedVehicle: null,
  zoom: 15,
  loading: false,
  mapTile: "osm",
  overlays: {
    traffic: false,
  },
};

const mapReducer = (actualState = mapInitState, action) => {
  switch (action.type) {
    case SET_SELECTED_VEHICLE:
      return ({ ...actualState, selectedVehicle: action.vin });
    case SET_MAP_ZOOM:
      return ({
        ...actualState,
        zoom: action.zoom,
      });
    case SET_MAP_CENTER:
      return ({
        ...actualState,
        center: { lat: action.latlon[0], lon: action.latlon[1] },
      });
    case SET_MAP_BOUNDS:
      return ({
        ...actualState,
        bounds: { corner1: action.corner1, corner2: action.corner2 },
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
    case SET_SEARCH_MARKER:
      return ({
        ...actualState,
        searchMarker: {
          label: action.label,
          latlon: action.latlon,
        },
      });
    case DISMISS_SEARCH_MARKER:
      return ({
        ...actualState,
        searchMarker: undefined,
      });
    case SET_MAP_TILE:
      return ({
        ...actualState,
        mapTile: action.mapTileName,
      });
    case TOGGLE_MAP_OVERLAY:
      return ({
        ...actualState,
        overlays: {
          ...actualState.overlays,
          [action.overlayName]: !actualState.overlays[action.overlayName],
        },
      });
    default: return actualState;
  }
};


export default mapReducer;

