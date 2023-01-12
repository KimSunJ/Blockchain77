import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../modules/comment";

import CommentComponent from "./Component";

const CommentContainer = ({ userName, boardId }) => {
  const dispatch = useDispatch();
  const list = useSelector(
    (state) => state.comment.filter((item) => item.boardId == boardId)
    // find => 조건에 맞는 (콜백 함수의 결과가 true가 되는) 것을 순서대로 찾아보다가 맞는 게 있으면 그것 하나만 가져온다.
    // filter => find와 같으나 조건에 맞는 아이템들을 배열로 가져온다.(db상에서 findAll)
  );

  const logUser = useSelector((state) => state.userInfo.userName);

  console.log(logUser);
  const add = (text) => {
    dispatch(action.add(text, userName, boardId));
  };

  const edit = (id, text) => {
    dispatch(action.edit(id, text));
  };

  const remove = (id) => {
    dispatch(action.remove(id));
  };

  return (
    <CommentComponent
      add={add}
      list={list}
      edit={edit}
      remove={remove}
      logUser={logUser}
    />
  );
};

export default CommentContainer;
