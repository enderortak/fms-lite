import { SET_SIDE_PANEL_VISIBILITY, SET_ACTIVE_SIDE_PANEL_TAB } from "./App.Actions";


const appInitState = {
  sidePanel: {
    visible: false,
    activeTabIndex: 1,
  },
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
    default: return actualState;
  }
};

export default appReducer;
