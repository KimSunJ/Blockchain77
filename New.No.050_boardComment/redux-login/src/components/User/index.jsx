import styled from "styled-components";
import { connect } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import RegistContainer from "./Regist/Container";
import LogInContainer from "./LogIn/Container";
import InfoContainer from "./Info/Container";

const UserComponent = ({ userName }) => {
  return (
    <UserBox>
      <div>
        {/* link 메뉴바 생성 */}
        <Link to={"/"}>Home</Link>
        {userName ? (
          <></>
        ) : (
          <>
            {" "}
            {/* 띄어쓰기 역할 */}| <Link to={"/regist"}>Regist</Link> |{" "}
            <Link to={"/login"}>LogIn</Link>
          </>
        )}
      </div>
      {userName ? <InfoContainer /> : <></>}
      <Routes>
        <Route path="/regist" element={<RegistContainer />} />
        <Route path="/login" element={<LogInContainer />} />
      </Routes>
    </UserBox>
  );
};
// router-dom 연결
const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(UserComponent);

const UserBox = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;
