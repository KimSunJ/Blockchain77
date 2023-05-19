import { useState } from "react";

import "./App.css";
import store from "./store";
import { COUNT1, actions as count1Actions } from "./action/count1";
// 이름이 중복되면 actions를 가져와서 as 'count1Actions'로 파일명을 바꿔서 가져온다.

function App() {
  const [inputCount, setCount] = useState(0);
  const [_, setRender] = useState(false);
  // ' _ '란, 보통 사용하지 않을 변수의 이름으로 설정한다.(일종의 관례)
  //' _ ' 라는 라이브러리(lowbar)도 있다. << 주의사항(import _ from 'lowbar'로 라이브러리를 가져올 수도 있음)

  return (
    <div className="App">
      <div>{store.getState().count1}</div>
      {/* store.getState() 는 store를 가져온다. */}
      {/* store.getState()로 받아온 store의 객체는 React의 랜더링에 관여하지 않는다. 그래서 Class Component에서는 forceupdate()를 사용해서 강제로 랜더링을 해준다. */}
      {/* Function Component에서는 state를 하나 만들어서 setState를 통해 랜더링을 강제한다. */}
      <input
        value={inputCount}
        type={"number"}
        onInput={(e) => {
          setCount(+e.target.value);
        }}
        placeholder="number"
      />
      <button
        // onClick={() => {
        //   store.dispatch({
        //     type: COUNT1.PLUS,
        //     payload: { input: inputCount },
        //   });
        onClick={() => {
          store.dispatch(count1Actions.plus(inputCount));
          // 유지 보수에 편해지게 하기 위해서
          setRender((state) => !state);
          // state를 바꾼것으로 인식하여 바꾼다. ((state)=>state++)
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch(count1Actions.minus(inputCount));
          setRender((state) => !state);
        }}
      >
        -
      </button>

      <button
        onClick={() => {
          store.dispatch({
            type: "count2/plus",
          });
          setRender((state) => !state);
        }}
      >
        2 +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count2/minus",
          });
          setRender((state) => !state);
        }}
      >
        2 -
      </button>
    </div>
  );
}

export default App;
