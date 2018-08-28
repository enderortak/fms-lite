export const SET_SIDE_PANEL_VISIBILITY = "SET_SIDE_PANEL_VISIBILITY";
export const SET_ACTIVE_SIDE_PANEL_TAB = "SET_ACTIVE_SIDE_PANEL_TAB";
export const SET_LANGUAGE = "SET_LANGUAGE";

export const setSidePanelVisibility =
    val => ({ type: SET_SIDE_PANEL_VISIBILITY, visible: val });
export const setActiveSidePanelTab =
    val => ({ type: SET_ACTIVE_SIDE_PANEL_TAB, activeTabIndex: val });
export const setLanguage =
    language => ({ type: SET_LANGUAGE, language });

