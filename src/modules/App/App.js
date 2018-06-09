import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import TopPanel from "./components/TopPanel";
import SidePanel from "./components/SidePanel";
import MapDisplay from "./../Map/Map";
import { setSidePanelVisibility, setActiveSidePanelTab } from "./App.Actions";
import { setMapBounds, setSearchMarker, dismissSearchMarker, setSelectedVehicle } from "./../Map/Map.Actions";
import "./App.scss";
import { requireAuth } from "./../../service/AuthService";


class App extends React.Component {
  static propTypes = {
    dispatch: propTypes.object.isRequired,
    state: propTypes.object.isRequired,
  }
  componentDidMount() {
    this.map = this.mapDisplay.map;
  }
  render() {
    const {
      dispatch, state, user, history,
    } = this.props;
    return (
      <React.Fragment>
        <TopPanel user={user} history={history} dispatch={dispatch} state={state} map={this.map} />
        <MapDisplay user={user} ref={(mapDisplay) => { this.mapDisplay = mapDisplay; }} />
        <SidePanel state={state} dispatch={dispatch} />

      </React.Fragment>
    );
  }
}

const state2Props = state => ({ state: { ...state } });
const dispatch2Props = dispatch => ({
  dispatch: {
    setSidePanelVisibility: visible => dispatch(setSidePanelVisibility(visible)),
    setActiveSidePanelTab: index => dispatch(setActiveSidePanelTab(index)),
    setMapBounds: (corner1, corner2) => dispatch(setMapBounds(corner1, corner2)),
    setSearchMarker: (label, latlon) => dispatch(setSearchMarker(label, latlon)),
    dismissSearchMarker: () => dispatch(dismissSearchMarker()),
    setSelectedVehicle: (vehicleId, latlon) => dispatch(setSelectedVehicle(vehicleId, latlon)),
  },
});

export default requireAuth(connect(state2Props, dispatch2Props)(App));
