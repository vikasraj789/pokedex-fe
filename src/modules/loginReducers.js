import APP_CONSTANTS from "../constants";

const initialState = {
    loggedIn: false,
    isAdmin: false,
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_CONSTANTS.login:
            return {
                ...state,
                user: action.payload,
                loggedIn: true,
            };

        case APP_CONSTANTS.setMode:
            return {
                ...state,
                isAdmin: action.payload,
            };

        default:
            return state;
    }
};
