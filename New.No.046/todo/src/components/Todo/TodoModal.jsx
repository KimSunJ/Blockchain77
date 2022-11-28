import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TodoBtn, STATUSLIST, STATUS } from "../setting";

export default function TodoModal({ setList, func }) {
  // console.log(useLocation().state);
  // todo/index.jsx에서 state가 안들어올수도 있다.
  const index = useLocation().state?.index;
  // item.jsx에서 받아오는 state
  const item = useLocation().state?.item;
  // location에 state와 index / state와 item이 있는지 여부 확인
  const [taskName, setTaskName] = useState(item ? item.taskName : "");
  const [status, setStatus] = useState(item ? item.status : STATUS.ToDo);

  return (
    <TodoModalBox>
      <TodoModalInnerBox>
        <div>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            // 동기화하기 위해서
            onInput={(e) => {
              setTaskName(e.target.value);
            }}
          />
        </div>
        <div>
          {STATUSLIST.map((item, index) => (
            <TodoBtn
              className={
                STATUSLIST[index].toLowerCase().replace(" ", "-") +
                (status === index ? " on" : "")
              }
              onClick={() => {
                setStatus(index);
              }}
              key={`TodoBtn-${index}`}
            >
              {item}
            </TodoBtn>
          ))}
          {/* <TodoBtn className="todo on">Todo</TodoBtn>
          <TodoBtn className="in-progress">In progress</TodoBtn>
          <TodoBtn className="complete">Complete</TodoBtn> */}
        </div>
        <div>
          <Link to={"/"}>
            <TodoBtn
              onClick={() => {
                if (func === "Add") {
                  setList((state) => [...state, { taskName, status }]);
                } else if (func === "Edit") {
                  setList((list) => {
                    const before = list.slice(0, index);
                    const after = list.slice(index + 1);
                    return [...before, { taskName, status }, ...after];
                  });
                }
              }}
            >
              {func}
            </TodoBtn>
          </Link>
          <Link to={"/"}>
            <TodoBtn>Cancle</TodoBtn>
          </Link>
        </div>
      </TodoModalInnerBox>
    </TodoModalBox>
  );
}

const TodoModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoModalInnerBox = styled.div`
  background-color: #ffff;
  border-radius: 10px;
  padding: 20px;
  width: 50%;

  input {
    width: 100%;
    padding: 5px 10px;
  }

  & > div {
    margin: 10px 0;
    display: flex;
    justify-content: space-evenly;

    &:last-child {
      justify-content: space-between;
    }
  }
`;
