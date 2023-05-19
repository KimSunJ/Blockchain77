import { useState } from "react";
import styled from "styled-components";

const CommentComponent = ({ add, list, edit, remove, logUser }) => {
  const [addText, setAddText] = useState("");
  return (
    <CommentBox>
      <CommentAddBox>
        <input
          type={"text"}
          value={addText}
          onInput={(e) => {
            setAddText(e.target.value);
          }}
          placeholder={"Comment"}
        />
        <button
          onClick={() => {
            add(addText);
          }}
        >
          Add Comment
        </button>
      </CommentAddBox>
      {list.map((item, index) => (
        <CommentItemComponent
          key={`comment-${index}`}
          item={item}
          edit={edit}
          remove={remove}
          logUser={logUser}
        />
      ))}
    </CommentBox>
  );
};

export default CommentComponent;

const CommentBox = styled.div``;

const CommentAddBox = styled.div``;

const CommentItemComponent = ({ item, edit, remove, logUser }) => {
  const [isEdit, setIsEdit] = useState(false);
  // isEdit가 참이면 수정 가능 상태 / 거짓이면 수정 불가 상태
  const [editText, setEditText] = useState(item.text);

  return (
    <div>
      {isEdit ? (
        <input
          type="text"
          value={editText}
          onInput={(e) => {
            setEditText(e.target.value);
          }}
        />
      ) : (
        // 입력할 것을 확인해야하기 때문
        item.text
        // 원래 입력한 것은 유지되어야 하고,
      )}{" "}
      - {item.userName}
      {item.userName == logUser ? (
        <>
          <button
            onClick={() => {
              if (isEdit) {
                edit(item.id, editText);
                setIsEdit(false);
              } else {
                setEditText(item.text);
                setIsEdit(true);
              }
              // edit(item.id, editText);
            }}
          >
            Edit
          </button>{" "}
          <button
            onClick={() => {
              isEdit ? setIsEdit(false) : remove(item.id);
            }}
          >
            {isEdit ? "Cancel" : "Remove"}
            {/* 상태 변환 >> 수정상태인지 확인 후 상태이면 Cancel이 나오도록 */}
          </button>{" "}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
