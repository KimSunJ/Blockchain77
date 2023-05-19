import React from "react";

export default class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    // props란 상위 컴포넌트에서 전달하는 데이터이다.
    // <ClassComp style={{ width:'10px' }} ></ClassComp>
    // style은 attribute? props?
    // attribute 는 HTML 태그에 적는 것
    // ClassComp는 컴포넌트이기 때문에 props(프로퍼티의 줄임말)이다.
    // 예제와 같이 style을 전달했다면 <div style={this.props.style}></div>;와 같이 써야한다. 그래야 HTML쪽에 출력이 된다.
    this.state = { count: 0 };
    // `const [count, setCount] = useState(0);` === this.state = { count: 0 }; 와 같은 구문
    // =======================================
    // this.state = {count:0, name:'길동'};
    // const [count, setCount] = useState(0);
    // const [name, setName] = useState('길동'); / useState(초기값);
  }
  render() {
    // return <div style={this.props.style}></div>;
    return (
      <div
        onClick={function () {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        {count}
        {console.log("asdf")}
      </div>
    );
  }
}

// class 가장 기본적 구문
// export default class ClassComp extends React.Component{
//     render(){
//         return <div></div>
//     }
// }
// >> 클래스형 컴포넌트
// export default function ClassComp({}){
//  return <div></div>
// }
// >> 함수형 컴포넌트
