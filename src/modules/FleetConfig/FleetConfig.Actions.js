export const SHOW_FLEET_CONFIG_MODAL = "SHOW_FLEET_CONFIG_MODAL";
export const HIDE_FLEET_CONFIG_MODAL = "HIDE_FLEET_CONFIG_MODAL";
export const SET_FLEET_CONFIG_ACTIVE_TAB = "SET_FLEET_CONFIG_ACTIVE_TAB";

export const showFleetConfigModal = () => ({ type: SHOW_FLEET_CONFIG_MODAL });
export const hideFleetConfigModal = () => ({ type: HIDE_FLEET_CONFIG_MODAL });
export const setFleetConfigActiveTab = tabIndex => ({ type: SET_FLEET_CONFIG_ACTIVE_TAB, tabIndex });

