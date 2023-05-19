import { useState } from "react";
import styled from "styled-components";

const AddCompornent = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  // 제목 내용
  return (
    <AddBox>
      <input
        type={"text"}
        value={title}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={"Title"}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        placeholder={"Texts"}
      />
      <button
        onClick={() => {
          onClick(title, text);
        }}
      >
        Add Board
      </button>
    </AddBox>
  );
};

export default AddCompornent;

const AddBox = styled.div``;
