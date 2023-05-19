import { useState } from "react";
import styled from "styled-components";
import Todo from "./components/Todo";

function App() {
  return (
    <AppBox>
      <Todo></Todo>
      {/* 기능별로 components를 나눈 것임 */}
    </AppBox>
  );
}

export default App;

const AppBox = styled.div`
  max-width: 1300px; // pc 기준 최대 크기
  margin: auto;

  &.test {
    background-color: lightgray;
    height: 100px;
    // return <AppBox className="test"></AppBox>; 일때 뜸
  }

  @media only screen and (max-width: 1400px) {
    max-width: 1000px;
  }
  @media only screen and (max-width: 1100px) {
    max-width: 600px;
  }
  @media only screen and (max-width: 700px) {
    max-width: 300px;
  }
`;
