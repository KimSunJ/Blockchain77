import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as userInfoIni } from "./reducer/userInfo";
import { initialize as userDBIni } from "./reducer/userDB";
import { initialize as boardIni } from "./board";
// import { initialize as userDBIni, reducer as userDBReducer } from "./reducer/userDB";
import { reducer } from "./reducer";

const store = createStore(
  reducer,
  { userInfo: userInfoIni, ...userDBIni, board: boardIni },
  // Container / dispatch(action.add(title, text, userName));에서 사용하는 구문
  // reducer에서도 가져와야함
  composeWithDevTools()
);

export default store;
