import propTypes from "prop-types";

const vehicleState = {
  ENGINE_OFF: 0,
  IDLING: 1,
  IDLING_VIOLATION: 2,
  MOVING: 3,
  NO_GPS: 4,
  NO_CONNECTION_SHORT: 5,
  NO_CONNECTION_LONG: 6,
  UNKNOWN: 99,
  colors: {
    [vehicleState.MOVING]: "blue",
    [vehicleState.ENGINE_OFF]: "red",
    [vehicleState.NO_GPS]: "purple",
    [vehicleState.IDLING]: "yellow",
    [vehicleState.IDLING_VIOLATION]: "orange",
    [vehicleState.NO_CONNECTION_SHORT]: "gray",
    [vehicleState.NO_CONNECTION_LONG]: "gray",
    [vehicleState.UNKNOWN]: "gray",
  },
};

export default vehicleState;

export const vehicleStatePropType = propTypes.oneOf(Object.keys(vehicleState).map(k => vehicleState[k]));
