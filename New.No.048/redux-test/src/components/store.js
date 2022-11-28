import { createStore } from "redux";
// createStore는 이름 그대로 store(저장소)를 만드는 함수. Deprecated 된 상태
//   - Deprecated : 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될(컴퓨터 시스템 기능 등)
// createStore를 대신하는 함수가 @reduxjs/toolkit 라이브러리의 configureStore 메서드이다.
// createStore가 왜 살아났느냐? << 기존의 코드들이 너무 많아서 사용자가 너무 많다.(yarn add redux@4.12 react-redux)
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  // store를 생성한다.
  reducer, // callback 함수 (함수 자체를 전달함)
  // (state) => state, // 첫번째 매개 변수로 reducer를 전달한다.
  { test: "redux testing" }, // 두번째 매개 변수로 초기 상태를 전달한다. initialize() / initializeState라고 많이 적는다.
  composeWithDevTools() // 옵션으로 devTool에 연결한다.
);

export default store;
