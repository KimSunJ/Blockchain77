import { useState } from "react";

import "./App.css";
import store from "./store";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "plus":
//       return {test: state.test}
//   }
// };

function App() {
  const [inputCount, setCount] = useState(0);

  return (
    <div className="App">
      <input
        value={inputCount}
        type={"number"}
        onInput={(e) => {
          setCount(+e.target.value);
        }}
        placeholder="number"
      ></input>
      <button
        onClick={() => {
          store.dispatch({
            type: "count1/plus",
            payload: { input: inputCount },
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count1/minus",
            payload: { input: inputCount },
          });
        }}
      >
        -
      </button>
      <div>
        <button
          onClick={() => {
            store.dispatch({ type: "count2/plus", payload: {} });
          }}
        >
          1 +
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: "count2/minus", payload: {} });
          }}
        >
          1 -
        </button>
      </div>
    </div>
  );
}

export default App;
