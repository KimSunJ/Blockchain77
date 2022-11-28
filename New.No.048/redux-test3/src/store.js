import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";

const store = createStore(reducer, { plus: [] }, composeWithDevTools());

export default store;
