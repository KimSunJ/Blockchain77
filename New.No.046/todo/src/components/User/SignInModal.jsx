import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import closeImg from "./xmark.svg";
import { CloseBtn } from ".";

export default function SignIn({ userList, setuserList }) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  // const [ableId, setAbleId] = useState(false);
  // const [ablePw, setAblePw] = useState(false);

  // useEffect(() => {
  //   setId(userId.length ? userId.match(/[a-z]/gi)?.join("") : "");
  //   if (userId.length < 5) setAbleId(false);
  //   else setAbleId(true);
  // }, [userId]);

  // useEffect(() => {
  //   if (userPw.length < 10) setAblePw(false);
  //   else setAblePw(true);
  // }, [userPw]);

  function onRegist() {
    if (userList.find((item) => item.userId === userId)) return;
    setuserList([...userList, { userId, userPw }]);
  }

  return (
    <SignInModalBox>
      <SignInBox>
        <Link to={"/"}>
          <CloseBtn>
            <img src={closeImg} alt="close" />
          </CloseBtn>
        </Link>
        <div>
          ID :
          <input
            type="text"
            placeholder="Id"
            className="inputText"
            value={userId}
            onInput={(e) => {
              setUserId(e.target.value);
            }}
          />
        </div>
        <div>
          PW :
          <input
            type="password"
            placeholder="Password"
            className="inputText"
            value={userPw}
            onInput={(e) => {
              setUserPw(e.target.value);
            }}
          />
        </div>
        <div>
          NAME :
          <input
            type="text"
            placeholder="User Name"
            className="inputText"
            value={userName}
            onInput={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <Link to={"/"}>
          <button
            className="signInBtn"
            onClick={() => {
              if (!(userId && userPw)) return;
              onRegist();
            }}
          >
            SignIn
          </button>
        </Link>
      </SignInBox>
    </SignInModalBox>
  );
}

const SignInModalBox = styled.div`
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

const SignInBox = styled.div`
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
    margin: 10px;
    height: 30px;
  }
  .signInBtn {
    width: 180px;
    height: 30px;
    margin: 10px;
  }
`;
