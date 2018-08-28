export const ENTER_PLAYBACK_MODE = "ENTER_PLAYBACK_MODE";
export const EXIT_PLAYBACK_MODE = "EXIT_PLAYBACK_MODE";

export const enterPlaybackMode = historyData => ({ type: ENTER_PLAYBACK_MODE, historyData });
export const exitPlaybackMode = () => ({ type: EXIT_PLAYBACK_MODE });

