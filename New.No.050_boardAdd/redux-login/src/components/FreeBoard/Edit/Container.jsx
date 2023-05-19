import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { action } from "../../../modules/board";

import EditCompornent from "./Component";

const EditContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(useLocation());
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );

  const onClick = (title, text) => {
    dispatch(action.edit(id, title, text));
    navigate(`/board/${id}`);
  };
  return <EditCompornent onClick={onClick} item={item} />;
};

export default EditContainer;
