import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as userIni } from "./modules/user";

import { reducer as user } from "./modules/user";

const store = createStore(
  combineReducers({ user }),
  { ...userIni },
  composeWithDevTools()
);

export default store;
