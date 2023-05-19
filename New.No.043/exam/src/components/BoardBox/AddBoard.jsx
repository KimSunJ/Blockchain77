import { useEffect, useState } from "react";
import styled from "styled-components";

export default function AddBoard({ texts, setTexts }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ableTitle, setAbleTitle] = useState(false);
  const [ableText, setAbleText] = useState(false);

  function onUproad() {
    if (texts.find((item) => item.title === title)) return;
    setTexts([...texts, { title, text }]);
  }

  return (
    <BoardBox>
      <input
        type={"text"}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="글 제목"
        value={title}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onInput={(e) => {
          setText(e.target.value);
        }}
        placeholder="글 내용"
        value={text}
      ></textarea>
      <button
        onClick={() => {
          if (!(ableTitle && ableText)) return;
          onUproad();
        }}
      >
        업로드
      </button>
    </BoardBox>
  );
}

const BoardBox = styled.div``;
