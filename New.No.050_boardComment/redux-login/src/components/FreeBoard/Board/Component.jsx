import styled from "styled-components";
import { Link } from "react-router-dom";

const BoardCompornent = ({ item, remove, isCreator }) => {
  // { title, userName, createdAt, text } >> item
  return (
    <BoardBox>
      <h1>{item.title}</h1>
      <h3>
        userName : {item.userName}-{item.createdAt}
        {!isCreator || (
          <span>
            <Link to={`/edit/${item.id}`}>
              <button>Edit</button>
            </Link>
            <button
              onClick={() => {
                remove();
              }}
            >
              Delete
            </button>
          </span>
        )}
      </h3>
      <p>{item.text}</p>
      <Link to={"/"}>
        <button>back</button>
      </Link>
    </BoardBox>
  );
};

export default BoardCompornent;

const BoardBox = styled.div``;
