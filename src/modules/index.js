import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { routerReducer } from "react-router-redux";
import login from "./loginReducers";
import pokemons from "./dashBoardReducers";
import fetchEpic from "./fetchEpic";
import putEpic from "./putEpic";

export const rootEpic = combineEpics(fetchEpic, putEpic);

export const appReducer = combineReducers({
    routing: routerReducer,
    login,
    pokemons,
});

export const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
};
