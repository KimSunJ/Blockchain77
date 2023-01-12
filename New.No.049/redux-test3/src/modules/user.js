const TYPE = {
  REGIST: "user/regist",
  LOGIN: "user/logIn",
  LOGOUT: "user/logOut",
};

const regist = (usersId, usersPw, usersName) => ({
  type: TYPE.REGIST,
  payload: { usersId, usersPw, usersName },
});

const logIn = (userId, userPw) => ({
  type: TYPE.LOGIN,
  payload: { userId, userPw },
});

const logOut = () => ({
  type: TYPE.LOGOUT,
});

export const action = { regist, logIn, logOut };

export const initialize = { user: { users: [], name: "" } };

export const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.REGIST:
      return { ...state, users: [...state.users, payload] };
    case TYPE.LOGIN:
      return { ...state, users: [...state.users, payload] };
    case TYPE.LOGOUT:
      return { ...state };
    default:
      return state;
  }
};
