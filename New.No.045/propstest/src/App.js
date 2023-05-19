import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState(0);
  let num = 0;

  const increase = () => {
    num += 1;
    console.log(num);
  };

  return (
    <div className="App" onClick={increase}>
      <ChildFunc text="Function" num={num} color={color} setColor={setColor} />
      <ChildComp text="Class" num={num} color={color} />
    </div>
  );
}
export default App;

class ChildComp extends React.Component {
  constructor(props) {
    // props란, 부모 컴포넌트가 전달한 데이터
    // 보통은 읽기 전용으로 사용 (재정의를 하지 않는다.)
    super(props);
    // 클래스형 컴포넌트에서는 constructor(생성자)에서 매개변수로 받아 상속 부모 클래스(React.Component)의 constructor(super)를 호출한다.
    // 이후 this.props를 사용하여 호출할(가져올) 수 있다.
    console.log(this.props);
    // this.props.color
  }

  // props도 state상태가 아니면 render가 안된다.
  render() {
    return (
      <>
        <h2>{this.props.text}</h2>
        <div style={{ color: "#" + this.props.color.toString(16) }}>
          {/* 
        toString(숫자) << 숫자의 해당 진수로 바꿔준다  / toString(16) << 16진수로 바꿔준다. #000000 / #FFFFFF 
        CSS에서 색상을 구현할 때 rgb(255, 255, 255), rgba(255, 255, 255, 1) red green blue alpha(opacity: 0 ~ 1)
        #00ff00 << green
        # 00(r) 00(g) 00(b) 
        */}
          {this.props.num}
        </div>
      </>
    );
  }
}

function ChildFunc(props) {
  // 함수형 컴포넌트에서는 매개변수로 바로 받는다.
  // {}를 사용하여 구조 분해 할당을 할 수 있다.
  // function ChildFunc({})
  // const {} = props 와 같다.
  console.log(props);
  // props.setColor

  const changeColor = () => {
    props.setColor((state) => {
      return state + 100;
    });
    // props.setColor(props.color + 100);
    // props.setColor((state) => state + 100); >> app < <ChildFunc text="Function" num={num} setColor={setColor} />
    // props.setColor((color) => color + 100);
    // props의 setColor 메서드를 호출한다.
    // state? setState(변경할 값) >> 함수형으로 작성 가능
    // setState((state)=>{ << 여기서의 state는 기존의 값
    //   return 변경할 값
    // })
    // setState((state)=>newState)
  };
  return (
    <>
      <h2>{props.text}</h2>
      <div onClick={changeColor}>{props.num}</div>
    </>
  );
}
