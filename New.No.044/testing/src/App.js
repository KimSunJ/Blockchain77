// React의 구조
// Component란? << 기능적으로 최소 단위(외부와 연결해주는 역할)
// -> 기능을 포함하는 HTML 구조 단위 (Javascript를 같이 사용하기 때문에 기능을 포함한다는 의미)
//  - 컴포넌트는 항상 HTML 구조를 return 해야한다.
//  - Func(함수형)에서는 함수 자체가 return 한다.
//  - Class(클래스형)에서는 render 메서드에서 return한다.
// 컴포넌트(root)
//  - App
//   - UserBox (시작과 끝이 있고, 업데이트를 한다)
//     - Regist
//     - LogIn
//     - LogOut
//   - BoardBox

import "./App.css";
import React from "react";
// function Test(){
// return <></>
// 빈 태그 여러개의 div를 형제로 묶어서 내보내고 싶을 경우 사용
// }

function App() {
  let test = "테스팅";
  let num = 1;
  let bool = true;
  let str = "문자열";
  let arr = [1, 2, 3, 4];
  let obj = { name: "객체" };
  let nul = null;
  let und = undefined;

  // console.log(if(){})
  // console.log(for(let i = 0; i < 10; i++){})
  // console.log(while(){})
  // '값을 내보낸다, 가져온다' 얘기할 수 잇는 것들과 if, for, while의 차이가 무엇인가?
  // '값을 내보낸다, 가져온다' << 변수(가져온다.), 함수(값을 내보낸다) << '수'이다.
  // if 조건문, for / while 반복문 << '문장'일 뿐이다.(코드에선 값을 가지지 않고 실행될 뿐인 아이다.)
  function testing() {
    return "함수 테스팅";
  }

  function increase() {
    num = num + 1;
    console.log(num);
  }

  let arrDiv = [
    <div key={0}>1</div>,
    <div key={1}>2</div>,
    <div key={2}>3</div>,
    <div key={3}>4</div>,
  ];

  function arrFunc(arr) {
    const tempArr = [];
    // for (let i = 0; i < arr.length; ++i) {
    //   tempArr.push(<div key={i}>{arr[i]}</div>);
    // }

    arr.forEach((item, index) => {
      tempArr.push(<div key={index}>{item}</div>);
    });
    return tempArr;
  }
  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

  return (
    <div className="App">
      <App1 />
      {/* {}는 값을 가져야만 출력할 수 있다. 단, Object의 경우엔 출력 방법이 모호하기 때문에 출력하지 못한다. */}
      <div>{test}</div>
      <div onClick={increase}>{num}</div>
      <div>{bool}</div>
      <div>{str}</div>
      <div>{arr}</div>
      <div>{obj.name}</div>
      <div>{nul}</div>
      <div>{und}</div>
      <div>{bool ? "true" : "false"}</div>
      {/* 이거 왜 삼항연산자로 쓰는가? */}
      {/* 값을 가지고 있는 것으로 바로 사용 가능하기 때문에 잘 사용함 */}
      {/* console.log()로 출력되는 것들은 값이 있는 것으로 알고 있어도 된다. */}
      <div>{testing()}</div>
      <div>
        {/* <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div> */}
        {arrDiv}
        {arrFunc(arr)}
        {arr.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
  // return 밖에서 함수로 내보낸 것을 안에서 불러오면 된다.
  // HTML 태그 내에서 {}를 사용하여 변수를 출력할 수 있다.
}
export default App;

// const app1 = new App1(props) >> Js
class App1 extends React.Component {
  // num = 0;
  // 여기서 정의한 것은 this의 프로퍼티로 추가한다.
  // 우리가 컴포넌트를 만들 때 컴포넌트의 모든 코드를 모르기 때문에 상속을 받도록 한다.
  constructor(props) {
    // 클래스를 생성할 때 실행되는 코드
    super(props);
    // 상속을 받았을 때 부모의 해당 메서드를 실행한다. << 부모의 constructor
    console.log("constructor");
    console.log(this);
    console.log(this.num);
    // let num = 0; >> undefined
    // this.num = 0;
    this.state = { name: "상태값", num: 0, classNames: ["app3"] };
    // App1의 state값을 줘서 '상태값'을 나타낸 것
  }

  divRef = React.createRef(); // useRef

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this);
    // 생긴것에 대해서만 생성
    // console.log(this.num);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this);
    // 수정됐을 때만 생성
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    console.log(this);
    // 삭제됐을 때만 생성 (컴포넌트에서 수정)
  }

  increaseFunc() {
    // this.num = this.num + 2;
    console.log(this);
    console.log(this.state.num);
    // 여기서의 this는 increaseFunc 메서드이다.
    // 호출하는 곳에서 bind 메서드로 this를 App1로 전달해야한다.
  }

  increase = () => {
    // this.state.num = this.state.num + 1;
    this.setState({ num: this.state.num + 1 });
    console.log(this.state.num);
    // 여기서의 this는 App1이 된다.
    // 호출하는 곳에서 bind 메서드를 적지 않아도 된다.
    // increase는 안에서만 인식이 된다.
  };

  changeName = () => {
    // this.state.name = this.state.name + "1"; << state를 직접적으로 변경하는 것을 지양한다.
    // '상태값' + '1' => '상태값1'
    this.setState({ name: this.state.name + "1" }); // state를 변경하려면 setState를 통해서 변경해라
    console.log(this.state.name);
    console.log(this.divRef.current);
    // 가상돔에서 특정한 돔을 가져오기 위해 사용하는 것 ref (특정 Component가 아니라 특정 Element에 접근하고 싶다)
  };

  changeClass = () => {
    if (this.state.classNames.indexOf("app4") === -1)
      this.setState({ classNames: [...this.state.classNames, "app4"] });
    else this.setState({ classNames: [...this.state.classNames.slice(0, 1)] });
  };

  render() {
    console.log("render");
    console.log(this);
    return (
      <>
        <div onClick={this.increaseFunc.bind(this)}>{this.state.num}</div>
        <div onClick={this.increase}>{this.state.num}</div>
        <div ref={this.divRef} onClick={this.changeName}>
          {this.state.name}
        </div>
        <div
          className={this.state.classNames.join(" ")}
          onClick={this.changeClass}
        >
          클래스 이름 설정 테스트 중
        </div>
      </>
    );
  }
  // render 값을 바꿀 수 있는 것은 상태값 뿐
}
