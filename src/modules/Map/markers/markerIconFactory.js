import { icon } from "leaflet";
import aqua from "./vehicle/aqua-marker.png";
import blue from "./vehicle/blue-marker.png";
import gray from "./vehicle/gray-marker.png";
import green from "./vehicle/green-marker.png";
import orange from "./vehicle/orange-marker.png";
import pink from "./vehicle/pink-marker.png";
import purple from "./vehicle/purple-marker.png";
import red from "./vehicle/red-marker.png";
import yellow from "./vehicle/yellow-marker.png";
import { VehicleStates } from "./../components/Markers";

const files = {
  aqua, blue, gray, green, orange, pink, purple, red, yellow,
};

const markers =
["aqua", "blue", "gray", "green", "orange", "pink", "purple", "red", "yellow"]
  .map(i => ({
    name: i,
    iconOptions: {
      iconUrl: files[i],
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -9],
    },
  }));

const mapState2Color = state => ({
  [VehicleStates.MOVING]: "blue",
  [VehicleStates.ENGINE_OFF]: "red",
  [VehicleStates.NO_GPS]: "purple",
  [VehicleStates.IDLING]: "yellow",
  [VehicleStates.IDLING_VIOLATION]: "orange",
  [VehicleStates.NO_CONNECTION_SHORT]: "gray",
  [VehicleStates.NO_CONNECTION_LONG]: "gray",
  [VehicleStates.UNKNOWN]: "gray",
}[state]);

const marker =
  (state, isSelected) =>
    icon(markers
      .filter(i => i.name === mapState2Color(state))
      .map(i =>
        ({
          ...i.iconOptions,
          className: isSelected ? "selected" : "",
        }))[0]);
export default marker;
