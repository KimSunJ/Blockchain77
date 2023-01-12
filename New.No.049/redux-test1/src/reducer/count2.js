const reducer = (state = 0, action) => {
  const { type } = action;
  switch (type) {
    case "count2/plus":
      return state + 1;

    case "count2/minus":
      return state - 1;
    default:
      return state;
  }
};

export default reducer;
