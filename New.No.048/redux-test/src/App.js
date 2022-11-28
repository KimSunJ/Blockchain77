import { Provider } from "react-redux";
// React에서 Redux를 사용하기 위한 Root 컴포넌트를 가져온다(Provider)
// 브라우저의 Redux DevTool과 연결해준다. (함수)
import store from "./components/store";
import logo from "./logo1.png";
import "./App.css";

// 동사무소에 가서 주민등록등본을 신청했다. => dispatch를 사용해 action의 type으로 '주민등록등본'을 보냈다.
// 접수원은 주민등록증과 500원을 받았다. => dispatch payload의 pay로 500을 포함하며 idCard로 true를 포함했다. reducer는 dispatch가 보낸 action을 받았다.
// 주민등록등본을 찾아 출력한다. => reducer는 받은 action을 기준으로 작업을 실행했다. / 주민임을 확인하기 위해 idCard를 받은 것을 확인했다. / 500원은 수수료로 챙겼다.
// 출력된 주민등록등본을 나에게 줬다. => state에 주민등록등본이 정의되었으며 해당 내용은 View(컴포넌트)에서 받아 확인했다.

function App() {
  return (
    <Provider store={store}>
      {/* 
      Redux를 사용하기 위해 Root 컴포넌트로 전체를 감싸준다.
      기존의 Root 컴포넌트는 Provider의 자식 컴포넌트가 된다.
      Provider의 props로 store를 전달한다.
      */}
      <div className="App">
        <button
          onClick={() => {
            store.dispatch({ type: "plus", payload: {} });
            // dispatch 메서드를 사용해서 action({type: "plus", payload: {}})을 reducer에 전달한다.
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: "plus2", payload: {} });
          }}
        >
          +2
        </button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </Provider>
  );
}

export default App;
