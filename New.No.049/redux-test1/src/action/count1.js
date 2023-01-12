export const COUNT1 = {
  PLUS: "count1/plus",
  // "count1/plus" >> 내용이 바뀌어도 바로 적용된다. (type이 바뀌는 것은 아니기 때문)
  MINUS: "count1/minus",
};
// 변수명이 전부 대문자다 >> 수정하지 않고 가져다 쓸 변수이기에 대문자로 사용 // 관례 중 하나
// ex) DB의 컬럼명들

const plus = (input) => {
  console.log(input);
  return {
    type: COUNT1.PLUS,
    payload: { input },
  };
  // 객체로 내보낸 것
};
// const plus = (input) => ({
//   type: COUNT1.PLUS,
//   payload: { input },
//   // payload는 변경될 수 있는 input 삽입
// });

const minus = (input) => ({
  type: COUNT1.MINUS,
  payload: { input },
});

export const actions = { plus, minus };
