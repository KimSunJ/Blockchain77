import { useState } from "react";

import "./App.css";
import store from "./store";

function App() {
  const [inputText, setInputText] = useState("");

  return (
    <div className="App">
      <input
        value={inputText}
        type={"text"}
        onInput={(e) => {
          setInputText(e.target.value);
        }}
        placeholder="text"
      ></input>
      <button
        onClick={() => {
          store.dispatch({
            type: "inputText/plus",
            payload: { input: inputText },
          });
        }}
      >
        push
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "inputText/minus",
            payload: { input: inputText },
          });
        }}
      >
        pop
      </button>
    </div>
  );
}

export default App;
