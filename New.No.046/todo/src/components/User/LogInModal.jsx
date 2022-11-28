import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import closeImg from "./xmark.svg";
import { CloseBtn } from ".";

export default function LogIn() {
  const [logId, setLogId] = useState("");
  const [logPw, setLogPw] = useState("");

  return (
    <LogInModalBox>
      <LogInBox>
        <Link to={"/"}>
          <CloseBtn>
            <img src={closeImg} alt="close" />
          </CloseBtn>
        </Link>
        <div>
          ID: <input className="inputText" type="text" placeholder="Id" />
        </div>
        <div>
          PW:
          <input className="inputText" type="password" placeholder="Password" />
        </div>
        <Link to={"/"}>
          <button className="signInBtn" onClick={() => {}}>
            Log In
          </button>
        </Link>
      </LogInBox>
    </LogInModalBox>
  );
}

const LogInModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogInBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  .inputText {
    display: inline-block;
    height: 30px;
    margin: 10px;
  }
  .signInBtn {
    width: 180px;
    height: 30px;
    margin: 10px;
  }
`;
