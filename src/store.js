import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import api from "./middlewares/api";

import rootReducer from "./reducers";

export const history = createBrowserHistory();

export default () => {
  const store = createStore (
    connectRouter(history)(rootReducer),
    composeWithDevTools(applyMiddleware(thunk, api)),
  );

  return store;
};