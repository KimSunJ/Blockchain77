import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../modules/board";

import AddCompornent from "./Component";

const AddContainer = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);
  // connect 대신 사용 가능 /

  const onClick = (title, text) => {
    dispatch(action.add(title, text, userName));
  };
  // userName,
  // store.dispatch를 가져오는 것

  return !userName || <AddCompornent onClick={onClick} />;
};

export default AddContainer;
