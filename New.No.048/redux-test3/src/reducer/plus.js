const plus = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "inputText/plus":
      return [...state, payload.input];
    case "inputText/minus":
      const tempArr = [...state];
      // tempArr.pop();
      return tempArr.filter((item) => item != payload.input);

    default:
      return state;
  }
};

export default plus;
