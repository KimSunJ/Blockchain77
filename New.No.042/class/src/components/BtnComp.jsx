import React from "react";
import styled from "styled-components";

export default class BtnComp extends React.Component {
  // 컴포넌트는 대문자로 시작해야한다 (파스칼 표기법)
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NumPad
        className="num-pad"
        // onClick={this.props.onClick}
        onClick={() => {
          this.props.onClick(+this.props.item);
        }}
      >
        {this.props.item}
        <div>
          <a>a</a>
        </div>
        <div></div>
        <a>a</a>
      </NumPad>
    );
  }
}

const NumPad = styled.div`
  width: 70px;
  height: 70px;
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  div {
    width: 10px;
    height: 10px;
    background-color: red;
    &:nth-child(2) {
      background-color: blue;
    }
    a {
      color: green;
    }
  }
  &:nth-child(2n) {
    background-color: lightgray;
  }
`;
// & : 현재 선택자(태그)