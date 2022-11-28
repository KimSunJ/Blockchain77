import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { TodoBtn } from "../setting";
import TodoModal from "./TodoModal";
import List from "../Todo/List/index";
import User from "../User";
// export 시 default를 쓰지 않으면 {}를 사용해 구조분해할당 형식으로 가져와야 한다.

export default function Todo() {
  const [list, setList] = useState([]);
  const [user, setUser] = useState("");

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <User user={user} setUser={setUser} />
        {!user || (
          <TodoModalBtnBox>
            <Link to={"add"}>
              <TodoBtn className="sky">Add Task</TodoBtn>
            </Link>
          </TodoModalBtnBox>
        )}
        <List list={list} setList={setList} />
        <Routes>
          <Route
            path={"add"}
            element={<TodoModal setList={setList} func={"Add"} />}
          />
          <Route
            path={"edit"}
            element={<TodoModal setList={setList} func={"Edit"} />}
          />
        </Routes>
      </div>
    </>
  );
}

const TodoModalBtnBox = styled.div`
  text-align: right;
`;
