import RegistComp from "../components/User";

import { connect } from "react-redux";
import { action } from "../modules/user";

const RegistContainer = ({ users, regist, logIn }) => {
  return <RegistComp users={users} regist={regist} logIn={logIn} />;
};

const mapStateToProps = (state, props) => {
  return { users: state.user.users, ...props };
};

const mapDispatchToProps = (dispatch) => {
  return {
    regist: (usersId, usersPw, usersName) => {
      dispatch(action.regist(usersId, usersPw, usersName));
    },
    logIn: (userId, userPw) => {
      dispatch(action.logIn(userId, userPw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistContainer);
