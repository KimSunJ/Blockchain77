import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";

const store = createStore(
  reducer,
  { count1: 0, count2: 0 },
  composeWithDevTools()
);

export default store;
