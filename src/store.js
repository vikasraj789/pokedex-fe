import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createEpicMiddleware } from "redux-observable";
import createHistory from "history/createBrowserHistory";
import { rootReducer, rootEpic } from "./modules";

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history), createEpicMiddleware(rootEpic)];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
