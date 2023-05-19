let a = 1;
let b = 2;

function add() {
  a += b;
  // a는 외부의 값이다, 그런 a를 수정했기 때문에 순수함수가 아니다.
}

function add1(a, b) {
  return a + b;
  // 변하지 않고 바로 반환시켰기 때문에 순수함수이다. (매개변수에 따른 리턴 값이 같아야 하기 때문)
}
