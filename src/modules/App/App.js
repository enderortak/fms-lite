import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import TopPanel from "./components/TopPanel";
import SidePanel from "./components/SidePanel";
import MapDisplay from "./../Map/Map";
import { setSidePanelVisibility, setActiveSidePanelTab } from "./App.Actions";
import "./App.scss";
import { requireAuth } from "./../../service/AuthService";


class App extends React.Component {
  static propTypes = {
    dispatch: propTypes.object.isRequired,
    state: propTypes.object.isRequired,
  }
  render() {
    const { dispatch, state, user } = this.props;
    return (
      <React.Fragment>
        <TopPanel user={user} history={this.props.history} />

        <MapDisplay ref={(mapDisplay) => { this.mapDisplay = mapDisplay; }} user={user} />
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
  },
});

export default requireAuth(connect(state2Props, dispatch2Props)(App));
