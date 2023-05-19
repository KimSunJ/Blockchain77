import { COUNT1 } from "../action/count1";

const reducer = (state = 0, action) => {
  console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case COUNT1.PLUS:
      return state + payload.input;
    case COUNT1.MINUS:
      return state - payload.input;
    default:
      return state;
  }
};

export default reducer;
