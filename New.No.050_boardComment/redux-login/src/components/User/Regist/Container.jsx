// import axios from "axios";

import store from "../../../modules/store";
import RegistComponent from "./Component";
import { action } from "../../../modules/reducer/userDB";
// action 만든 곳

const RegistContainer = () => {
  const onClick = (userId, userPw, userName) => {
    console.log("5. RegistContainer onClick => 6. dispatch");
    store.dispatch(action.regist(userId, userPw, userName));
    // express server 연결
    // axios.post("http://localhost:8080/api/user/regist", {
    //   userId,
    //   userPw,
    //   userName,
    // });
  };

  console.log("1. RegistContainer", onClick);

  return <RegistComponent onClick={onClick} />;
};

export default RegistContainer;
