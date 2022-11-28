import styled from "styled-components";

export default function LogOut({ user, setUser }) {
  return (
    <div>
      {user ? `${user} 님 어서오세요.` : ""}
      <LogOutBtn
        onClick={() => {
          setUser("");
        }}
      >
        Log out
      </LogOutBtn>
    </div>
  );
}

export const LogOutBtn = styled.div`
  display: inline-block;
  border: 1px solid rgba(250, 250, 250, 1);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
  background-color: blue;
  margin-right: 5px;
`;
