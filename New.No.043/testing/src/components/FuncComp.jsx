// export default function FuncComp(props) {
//   props.func();
//   return <div>FuncComp {props.text}</div>;
// }

import { useState, useEffect } from "react";
// 제일 위에 배치되어 있어야 함

export default function FuncComp({ text, func }) {
  // 함수형 컴포넌트에서 클래스형 컴포넌트의 기능들을 사용하기 위해 사용하는 것을 Hook이라고 한다.
  // Hook은 use로 시작한다.
  // useState, useEffect, useCallback, useMemo, useRef, useContext, useReducer 등등이 있다.
  // Hook은 사용자가 구현할 수도 있다. (보통 '커스텀 훅'이라고 한다.)
  //  - Custom Hook과 Component의 차이 => HTML 문법으로 return하는가 안하는가?
  // useState와 useEffect는 뺄 수 없는 Hook이다. 단, 나머지는 사용하지 않아도 크게 상관은 없다.
  const [test, setTest] = useState("state test");
  // state 선언 및 정의(초기화)
  // state: 상태값, React에서의 리랜더링(다시 그리기)의 기준이 된다.
  // state가 변경(재정의)되면 컴포넌트를 다시 불러온다.
  // 단, 다시 불러올 때 Hook으로 된 변수, 함수들은 다시 부르지 않는다(useState 등등)
  // useState는 함수형 컴포넌트 중 중요한 역할을 하는 두가지 중 하나다.
  //  ======= 예시 =======
  const [study] = useState("state study");

  func();

  useEffect(() => {
    // useEffect는 랜더링 후에 실행되는 콜백함수이다
    console.log("useEffect");
    // 아래가 componentWillUnmount와 같다.
    return () => {
      console.log("componentWillUnmount");
      // 빈배열의 useEffect에서 함수를 return 하면 componentWillUnmount와 같은 작동을 한다.
    };
  }, []);
  // useEffect의 두번째 매개변수는 state 값의 배열을 넣는다.
  // 빈배열의 경우 componentDidMount와 같은 역할을 한다.(감지하고 싶은 것만 넣는것)
  // 즉, 마운트 됐을 때만 실행한다.
  // useEffect는 함수형 컴포넌트 중 중요한 역할을 하는 두가지 중 하나다.

  useEffect(() => {
    console.log("state change");
    // state값이 변화했을 때 실행되는 메서드
  });
  // 위의 구문이 먼저 돈다. 중첩된다.(addEventListener)

  useEffect(() => {
    console.log("test change");
    // state 중 test 값이 변화했을 때 실행되는 메서드
  }, [test]);

  useEffect(() => {
    console.log("study change");
    // state 중 test 값이 변화했을 때 실행되는 메서드
  }, [study]);
  // 두번째 매개변수 배열의 아이템으로 프로그래머가 감지하고 싶은 state(상태값)를 넣는다.
  // study가 변경(재정의) 됐을 때만 실행된다.

  useEffect(() => {
    console.log("test || study change");
  }, [test, study]);

  return (
    <div
      onClick={function () {
        setTest(test + "1");
        // state 재정의
      }}
    >
      FuncComp{text}
      {test}
      {study}
    </div>
  );
}
