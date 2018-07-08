import { SHOW_FLEET_CONFIG_MODAL, HIDE_FLEET_CONFIG_MODAL, SET_FLEET_CONFIG_ACTIVE_TAB } from "./FleetConfig.Actions";


const fleetConfigInitState = {
  visible: false,
  activeTab: 0,
};

const fleetConfigReducer = (actualState = fleetConfigInitState, action) => {
  switch (action.type) {
    case SHOW_FLEET_CONFIG_MODAL:
      return ({
        ...actualState,
        visible: true,
      });
    case HIDE_FLEET_CONFIG_MODAL:
      return ({
        ...actualState,
        visible: false,
      });
    case SET_FLEET_CONFIG_ACTIVE_TAB:
      return ({
        ...actualState,
        activeTab: action.tabIndex,
      });
    default: return actualState;
  }
};

export default fleetConfigReducer;

