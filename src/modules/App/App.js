import React from "react";
import propTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";
import TopPanel from "./components/TopPanel";
import SidePanel from "./components/SidePanel";
import MapDisplay from "./../Map/Map";
import Playback from "./../Playback/Playback";
import { setSidePanelVisibility, setActiveSidePanelTab } from "./App.Actions";
import {
  setMapBounds, setSearchMarker, dismissSearchMarker, setSelectedVehicle,
} from "./../Map/Map.Actions";
import { showFleetConfigModal } from "./../FleetConfig/FleetConfig.Actions";
import "./App.scss";
import { requireAuth } from "./../../service/AuthService";
import { DebugPanel } from "./../../service/DebugService";


class App extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    isPlaybackActive: propTypes.bool.isRequired,
    isSidePanelVisible: propTypes.bool.isRequired,
    sidePanelActiveTab: propTypes.number.isRequired,
    onFleetConfigClick: propTypes.func.isRequired,
    onSidePanelToggleClick: propTypes.func.isRequired,
    onSidePanelTabChange: propTypes.func.isRequired,
  }
  render() {
    const {
      isPlaybackActive, isSidePanelVisible, sidePanelActiveTab,
      onFleetConfigClick, onSidePanelToggleClick, onSidePanelTabChange,
      history,
    } = this.props;
    const topPanel = (<TopPanel
      history={history}
      onFleetConfigClick={onFleetConfigClick}
    />);
    const sidePanel = (<SidePanel
      isSidePanelVisible={isSidePanelVisible}
      sidePanelActiveTab={sidePanelActiveTab}
      onSidePanelToggleClick={onSidePanelToggleClick}
      onSidePanelTabChange={onSidePanelTabChange}
    />);
    return (
      <React.Fragment>
        {topPanel}
        <MapDisplay />
        {sidePanel}
        {isPlaybackActive && <Playback />}
        <DebugPanel />
      </React.Fragment>
    );
  }
}

const state2Props = state => ({
  isPlaybackActive: state.playback.isActive,
  isSidePanelVisible: state.app.sidePanel.visible,
  sidePanelActiveTab: state.app.sidePanel.activeTabIndex,
});
const dispatch2Props = dispatch => ({
  setSidePanelVisibility: visible => dispatch(setSidePanelVisibility(visible)),
  onSidePanelToggleClick: isVisible => dispatch(setSidePanelVisibility(!isVisible)),
  onSidePanelTabChange: index => dispatch(setActiveSidePanelTab(index)),
  setMapBounds: (corner1, corner2) => dispatch(setMapBounds(corner1, corner2)),
  setSearchMarker: (label, latlon) => dispatch(setSearchMarker(label, latlon)),
  dismissSearchMarker: () => dispatch(dismissSearchMarker()),
  setSelectedVehicle: (vin, latlon) => dispatch(setSelectedVehicle(vin, latlon)),
  onFleetConfigClick: () => dispatch(showFleetConfigModal()),
});

export default requireAuth(connect(state2Props, dispatch2Props)(App));
