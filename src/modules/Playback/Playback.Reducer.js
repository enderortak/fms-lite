import {
  ENTER_PLAYBACK_MODE, EXIT_PLAYBACK_MODE,
} from "./Playback.Actions";

const playbackInitState = {
  isActive: false,
  markerPosition: null,
  pathVisible: false,
  historyData: null,
};

const playbackReducer = (actualState = playbackInitState, action) => {
  switch (action.type) {
    case ENTER_PLAYBACK_MODE:
      return ({
        ...actualState,
        isActive: true,
        historyData: action.historyData,
      });
    case EXIT_PLAYBACK_MODE:
      return ({
        ...actualState,
        isActive: false,
        historyData: null,
      });
    default: return actualState;
  }
};


export default playbackReducer;
