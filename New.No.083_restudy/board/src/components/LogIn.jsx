import styled from "styled-components";

const LogInComponent = ({ changeFuncs, logIn }) => {
  return (
    <LogInBox>
      <label>
        ID:
        <input type="text" onInput={changeFuncs.changeId} />
      </label>
      <label>
        PW:
        <input type="password" onInput={changeFuncs.changePw} />
      </label>
      <button onClick={logIn}>Log In</button>
    </LogInBox>
  );
};

export default LogInComponent;

const LogInBox = styled.div`
  label {
    display: block;
    input {
      margin-left: 0.5rem;
    }
  }
`;
