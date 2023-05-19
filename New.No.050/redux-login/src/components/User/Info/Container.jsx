import { connect } from "react-redux";

import InfoComponent from "./Component";
import { action } from "../../../modules/reducer/userInfo";
import store from "../../../modules/store";

const InfoContainer = ({ userName }) => {
  console.log(userName);
  const onClick = () => {
    store.dispatch(action.logOut());
  };
  return <InfoComponent userName={userName} onClick={onClick} />;
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(InfoContainer);
