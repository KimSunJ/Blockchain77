import { useSelector } from "react-redux";
import ListCompornent from "./Component";

const ListContainer = () => {
  const list = useSelector((state) => state.board);
  return <ListCompornent list={list} />;
};

export default ListContainer;
