import { useState } from "react";

export default function RegistComp({ regist, logIn, logOut }) {
  const [usersId, setUsersId] = useState("");
  const [usersPw, setUsersPw] = useState("");
  const [usersName, setUsersName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  return (
    <div>
      <div>
        <input
          type={"text"}
          onInput={(e) => {
            setUsersId(e.target.value);
          }}
          placeholder="ID"
          value={usersId}
        />
        <input
          type={"password"}
          onInput={(e) => {
            setUsersPw(e.target.value);
          }}
          placeholder="PW"
          value={usersPw}
        />
        <input
          type={"text"}
          onInput={(e) => {
            setUsersName(e.target.value);
          }}
          placeholder="NAME"
          value={usersName}
        />
        <button
          onClick={() => {
            regist(usersId, usersPw, usersName);
          }}
        >
          Regist
        </button>
      </div>
      <div>
        <input
          type={"text"}
          onInput={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="ID"
          value={userId}
        />
        <input
          type={"password"}
          onInput={(e) => {
            setUserPw(e.target.value);
          }}
          placeholder="PW"
          value={userPw}
        />
        <button
          onClick={() => {
            logIn(userId, userPw);
          }}
        >
          LogIn
        </button>
      </div>
      <div>
        <p></p>
        <button
          onClick={() => {
            logOut(userId);
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
