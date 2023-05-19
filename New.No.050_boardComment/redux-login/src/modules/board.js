const TYPE = {
  ADD: "board/add",
  REMOVE: "board/remove",
  EDIT: "board/edit",
};
// 일거리들을 만들어놨으니 해당 일거리에 대한 주문서(action)을 만들자

const add = (title, text, userName) => ({
  type: TYPE.ADD,
  payload: { title, text, userName },
});
const remove = (id) => ({
  type: TYPE.REMOVE,
  payload: { id },
});
const edit = (id, title, text) => ({
  // id를 기준으로 title, text 수정할 것
  type: TYPE.EDIT,
  payload: { id, title, text },
});

export const action = { add, remove, edit };

export const initialize = [];
// initialize >> import

let id = 0;
export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.ADD:
      const { title, text, userName } = payload;
      id++;
      return [
        { id, title, text, userName, createdAt: new Date().toLocaleString() },
        ...state,
        // { ...payload, createdAt: new Date().toLocaleString() },
        // id가 있는 이유 : 수정, 삭제 때문에
        // 최신글이 위로 올라와야하기 때문에 순서를 변경
      ];

    case TYPE.REMOVE: {
      const index = state.findIndex((item) => item.id == payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    // 중괄호로 묶으면 scope내에서 실행되기 때문에 중복이 가능
    case TYPE.EDIT: {
      const index = state.findIndex((item) => item.id == payload.id);
      return [
        ...state.slice(0, index),
        { ...state[index], ...payload },
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};
