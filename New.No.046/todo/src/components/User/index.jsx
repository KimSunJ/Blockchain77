import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import SignInModal from "./SignInModal";
import LogInModal from "./LogInModal";
import LogOut from "./LogOut";

export default function User() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");

  return (
    <div>
      <Link to={"/singIn"}>
        <UserBtn userList={userList} setUserList={setUserList}>
          Sign In
        </UserBtn>
      </Link>
      <Link to={"/logIn"}>
        <UserBtn userList={userList} setUser={setUser}>
          Log In
        </UserBtn>
      </Link>
      {!user || <LogOut user={user} setUser={setUser} />}
      <Routes>
        <Route path={"singIn"} element={<SignInModal setUser={setUser} />} />
        <Route path={"logIn"} element={<LogInModal setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export const UserBtn = styled.div`
  display: inline-block;
  border: 1px solid rgba(250, 250, 250, 1);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
  background-color: blue;
  margin-right: 5px;
`;

export const CloseBtn = styled.div`
  width: 15px;
  float: left;
  margin: 0 40px;
`;
