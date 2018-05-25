import { push } from "react-router-redux";
import APP_CONSTANTS from "./constants";

export function goTo(url) {
    return push(url);
}

export const fetchData = data => ({ type: APP_CONSTANTS.fetchData, payload: data });

export const fetchDataSuccess = data => ({ type: APP_CONSTANTS.fetchDataSuccess, payload: data });

export const fetchDataFailure = data => ({ type: APP_CONSTANTS.fetchDataFailure, payload: data });

export const putData = data => ({ type: APP_CONSTANTS.putData, payload: data });

export const putDataSuccess = data => ({ type: APP_CONSTANTS.putDataSuccess, payload: data });

export const putDataFailure = data => ({ type: APP_CONSTANTS.putDataFailure, payload: data });
