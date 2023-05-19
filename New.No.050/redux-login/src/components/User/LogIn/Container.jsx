import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import LogInComponent from "./Component";
import { action } from "../../../modules/reducer/userInfo";
import store from "../../../modules/store";

const LogInContainer = ({ userName }) => {
  const navigate = useNavigate(); // location.href 와 같은 훅이다

  const onClick = (userId, userPw) => {
    store.dispatch(action.logIn(userId, userPw, store.getState().userDB));
  };

  useEffect(() => {
    if (userName) navigate("/");
  }, [userName]);

  return <LogInComponent onClick={onClick} />;
};

// 로그아웃 시 Home으로 링크 연결하기 위한 작업
const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(LogInContainer);
