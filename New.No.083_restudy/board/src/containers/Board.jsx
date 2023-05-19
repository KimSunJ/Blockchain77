import { useEffect, useState } from "react";
import { board } from "../api";
import { BoardComponent } from "../components/Board";

export const BoardContainer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // async 작동 x
    board({ limit: 10, offset: 4, order: [["id", "DESC"]] }).then(
      ({ isError, list }) => {
        if (!isError) setList(list);
      }
    );
  }, []);
  return <BoardComponent list={list} />;
};
