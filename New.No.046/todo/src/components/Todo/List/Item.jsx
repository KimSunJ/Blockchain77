import { Link } from "react-router-dom";
import styled from "styled-components";
import penImg from "./pen.svg";
import trashImg from "./trash.svg";
import { TodoBtn, STATUSLIST } from "../../setting";

export default function Item({ item, index, setList }) {
  return (
    <ItemTr>
      <td>{index + 1}</td>
      <td>{item.taskName}</td>
      <td>홍길이</td>
      <td>
        <TodoBtn
          className={STATUSLIST[item.status].toLowerCase().replace(" ", "-")}
          style={{ cursor: "default" }}
        >
          {STATUSLIST[item.status]}
        </TodoBtn>
      </td>
      <td>
        <Link to={"/edit"} state={{ index, item }}>
          <TodoBtn className="todo">
            <img
              src={penImg}
              alt="penImg"
              style={{
                filter:
                  "invert(47%) sepia(66%) saturate(606%) hue-rotate(325deg) brightness(94%) contrast(96%)",
              }}
            />
          </TodoBtn>
        </Link>
      </td>
      <td>
        <TodoBtn
          className="todo"
          onClick={() => {
            setList((list) => {
              const before = list.slice(0, index);
              const after = list.slice(index + 1);
              console.log(before, index, after);
              return [...before, ...after];
            });
          }}
        >
          <img
            src={trashImg}
            alt="trashImg"
            style={{
              filter:
                "invert(24%) sepia(5%) saturate(4996%) hue-rotate(79deg) brightness(107%) contrast(88%)",
            }}
          />
        </TodoBtn>
      </td>
    </ItemTr>
  );
}

const ItemTr = styled.tr`
  text-align: center;
  height: 50px;

  td {
    border-bottom: 1px solid lightgray;

    img {
      width: 15px;
    }
  }
`;
