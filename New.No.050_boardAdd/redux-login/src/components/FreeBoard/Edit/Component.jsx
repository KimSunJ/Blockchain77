import styled from "styled-components";
import { useState } from "react";

const EditCompornent = ({ onClick, item }) => {
  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.text);
  return (
    <EditBox>
      <h1>
        {" "}
        <input
          type={"text"}
          value={title}
          onInput={(e) => {
            setTitle(e.target.value);
          }}
          placeholder={"Title"}
        />{" "}
      </h1>
      <h3>
        userName : {item.userName}-{item.createdAt}
      </h3>
      <p>
        {" "}
        <textarea
          value={text}
          onInput={(e) => {
            setText(e.target.value);
          }}
          cols="30"
          rows="10"
          type={"text"}
          placeholder={"Text"}
        ></textarea>{" "}
      </p>
      <button
        onClick={() => {
          onClick(title, text);
        }}
      >
        Edit
      </button>
    </EditBox>
  );
};

export default EditCompornent;

const EditBox = styled.div``;
