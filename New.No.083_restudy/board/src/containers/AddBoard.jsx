import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { newBoard } from "../api";
import AddBoardComponent from "../components/AddBoard";

const AddBoardContainer = ({ userName }) => {
  const [boardData, setBoardData] = useState({
    title: "",
    text: "",
  });

  const navigate = useNavigate();

  const changeTitle = (e) => {
    setBoardData((state) => ({ ...state, title: e.target.value }));
  };

  const changeText = (e) => {
    setBoardData((state) => ({ ...state, text: e.target.value }));
  };

  const upload = async () => {
    if (!boardData.title || !boardData.text) return;
    const result = await newBoard({ ...boardData, userName });
    if (!result.isError) navigate("/");
  };

  return (
    <AddBoardComponent
      changeFuncs={{ changeTitle, changeText }}
      // 객체로 전달
      upload={upload}
    />
  );
};

export default AddBoardContainer;