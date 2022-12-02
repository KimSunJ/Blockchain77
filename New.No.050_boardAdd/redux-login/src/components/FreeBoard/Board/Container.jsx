import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { action } from "../../../modules/board";

import BoardCompornent from "./Component";

const BoardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(useLocation());
  // useParams의 결과는 { id:*** }으로 나온다.
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );
  const userName = useSelector((state) => state.userInfo.userName);

  const remove = () => {
    dispatch(action.remove(item.id));
    navigate("/");
  };

  return (
    <BoardCompornent
      item={item}
      remove={remove}
      isCreator={userName == item.userName}
      // 작성자인지 아닌지 확인하기 위한 예외처리사항
    />
  );
};

export default BoardContainer;
