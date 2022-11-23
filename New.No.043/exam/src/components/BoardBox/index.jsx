import { useEffect, useState } from "react";
import styled from "styled-components";
import AddBoard from "./AddBoard";
import List from "./List";

export default function BoardBox() {
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <BoardStyled>
      <AddBoard texts={texts} setTexts={setTexts} />
      <List texts={texts} setText={setText} />
    </BoardStyled>
  );
}

const BoardStyled = styled.div``;
