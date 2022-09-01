let firstNum = 0;
let secondNum = 0;

// let test1 = function () {
//   firstNum++;
//   console.log(firstNum);
// };
// function test2() {
//   firstNum += 2;
//   console.log(firstNum);
// }

// function test3() {
//   console.log(firstNum + secondNum);
// }

// test1();
// test2();
// test3();

// function addFunc(firstNum, secondNum) {
//   console.log(firstNum + secondNum);
// }

function addFN() {
  firstNum++;
  //   firstNum를 하나 증가시킨다.
  console.log("firstNum : " + firstNum);
  //   firstNum를 콘솔창에 출력한다.
}

const addSN = function () {
  secondNum++;
  console.log("secondNum : " + secondNum);
};

const sum = () => {
  console.log(firstNum + secondNum);
  console.log(sumNum);
  //  return sumNum;
  //  >> 수가 적기 때문에 사용할 필요 없다.
};

function examAddFN(firstNum) {
  // 매개변수는 위에 변수와 다른 변수가 된다.
  // 1번째 줄에서 선언한 firstNum와 매개변수로 선언된 firstNum는 엄연히 다른 놈이다.
  console.log(firstNum);
  firstNum++;
  firstNum += 1;
  firstNum = first + 1;
  console.log(firstNum);
}

examAddFN(); //<< 매개변수가 없어, 20번째 줄의 firstNum는 undefined
