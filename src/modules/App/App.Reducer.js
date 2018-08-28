import { SET_SIDE_PANEL_VISIBILITY, SET_ACTIVE_SIDE_PANEL_TAB, SET_LANGUAGE } from "./App.Actions";
import AuthService from "./../../service/AuthService";

const auth = new AuthService();

const appInitState = {
  sidePanel: {
    visible: false,
    activeTabIndex: 0,
  },
  language: auth.getUser().appSettings.language,
};

const appReducer = (actualState = appInitState, action) => {
  switch (action.type) {
    case SET_SIDE_PANEL_VISIBILITY:
      return ({
        ...actualState,
        sidePanel: {
          ...actualState.sidePanel,
          visible: action.visible,
        },
      });
    case SET_ACTIVE_SIDE_PANEL_TAB:
      return ({
        ...actualState,
        sidePanel: {
          ...actualState.sidePanel,
          activeTabIndex: action.activeTabIndex,
        },
      });
    case SET_LANGUAGE:
      return ({
        ...actualState,
        language: action.language,
      });
    default: return actualState;
  }
};

export default appReducer;
