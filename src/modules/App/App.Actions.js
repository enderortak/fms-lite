export const SET_SIDE_PANEL_VISIBILITY = "SET_SIDE_PANEL_VISIBILITY";
export const SET_ACTIVE_SIDE_PANEL_TAB = "SET_ACTIVE_SIDE_PANEL_TAB";

export const setSidePanelVisibility =
    val => ({ type: SET_SIDE_PANEL_VISIBILITY, visible: val });
export const setActiveSidePanelTab =
    val => ({ type: SET_ACTIVE_SIDE_PANEL_TAB, activeTabIndex: val });

