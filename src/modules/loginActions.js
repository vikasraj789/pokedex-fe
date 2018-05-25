import APP_CONSTANTS from "../constants";

export const login = data => ({ type: APP_CONSTANTS.login, payload: data });

export const logout = () => ({ type: APP_CONSTANTS.logout, payload: null });

export const setMode = data => ({ type: APP_CONSTANTS.setMode, payload: data });
