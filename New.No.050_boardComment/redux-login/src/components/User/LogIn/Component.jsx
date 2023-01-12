import { useState } from "react";
import styled from "styled-components";

const LogInComponent = ({ onClick }) => {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");

  return (
    <LogInBox>
      <input
        type={"text"}
        value={userId}
        onInput={(e) => {
          setId(e.target.value);
        }}
        placeholder={"ID"}
      />
      <input
        type={"password"}
        value={userPw}
        onInput={(e) => {
          setPw(e.target.value);
        }}
        placeholder={"PW"}
      />
      <button
        onClick={() => {
          onClick(userId, userPw);
        }}
      >
        Log In
      </button>
    </LogInBox>
  );
};

export default LogInComponent;

const LogInBox = styled.div`
  input {
    padding: 5px;
  }
`;
