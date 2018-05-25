import APP_CONSTANTS from "../constants";
import { getNames, getTypes } from "../utils";

const initialState = {
    list: [],
    names: [],
    types: [],
    fetching: false,
    error: false,
    query: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_CONSTANTS.fetchData:
            return {
                ...state,
                fetching: true,
                query: action.payload,
            };
        case APP_CONSTANTS.fetchDataSuccess:
            const list = [...state.list, ...action.payload];
            const names = getNames(list);
            const types = getTypes(list);
            return {
                ...state,
                fetching: false,
                list: list,
                names,
                types,
            };
        case APP_CONSTANTS.fetchDataFailure:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
