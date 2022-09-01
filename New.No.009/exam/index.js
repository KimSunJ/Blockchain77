// 오늘의 과제: 숫자 선택 (2개)를 선택하고 +, -, *, /, % 중 하나를 누르면 계산된 값이 alert창으로 출력된다.
let firstNum = 0;
let secondNum = 0;
let count = 0;
// do {
//     console.log(count < 2 ? firstNum : secondNum);
//   }

function a() {
  console.log("AC");
}

const nb7 = function () {
  count++;
  if (count == 1) {
    firstNum = 7;
    console.log("7");
  } else if (count != 1) {
    secondNum = 7;
    console.log("7");
  }
};

const nb8 = function () {
  count++;
  if (count == 1) {
    firstNum = 8;
    console.log("8");
  } else if (count != 1) {
    secondNum = 8;
    console.log("8");
  }
};

const nb9 = function () {
  count++;
  if (count == 1) {
    firstNum = 9;
    console.log("9");
  } else if (count != 1) {
    secondNum = 9;
    console.log("9");
  }
};

const e = function () {
  count++;
  if (count > 2) {
    console.log(firstNum * secondNum);
  }
  //   if (count == 2 && nb0) {
  //     firstNum;
  //     console.log(firstNum ** secondNum);
  //   } else if (count != 1) {
  //     secondNum;
  //     console.log(firstNum * secondNum);
  //   }
};

function nb4() {
  count++;
  if (count == 1) {
    firstNum = 4;
    console.log("4");
  } else if (count != 1) {
    secondNum = 4;
    console.log("4");
  }
}

const nb5 = function () {
  count++;
  if (count == 1) {
    firstNum = 5;
    console.log("5");
  } else if (count != 1) {
    secondNum = 5;
    console.log("5");
  }
};

const nb6 = function () {
  count++;
  if (count == 1) {
    firstNum = 6;
    console.log("6");
  } else if (count != 1) {
    secondNum = 6;
    console.log("6");
  }
};

const f = function () {
  if (count == 2) {
    alert(`계산값은 ${firstNum - secondNum} 입니다`);
  }
};

const nb1 = function () {
  count++;
  if (count == 1) {
    firstNum = 1;
    console.log("1");
  } else if (count != 1) {
    secondNum = 1;
    console.log("1");
  }
};

const nb2 = function () {
  count++;
  if (count == 1) {
    firstNum = 2;
    console.log("2");
  } else if (count != 1) {
    secondNum = 2;
    console.log("2");
  }
};

const nb3 = function () {
  count++;
  if (count == 1) {
    firstNum = 3;
    console.log("3");
  } else if (count != 1) {
    secondNum = 3;
    console.log("3");
  }
};

function add() {
  if (count == 2) {
    alert(`계산값은 ${firstNum + secondNum} 입니다`);
  }
}

const h = function () {
  count++;
  if (count == 1) {
    firstNum = 0;
    console.log("0");
  } else if (count != 1) {
    secondNum = 0;
    console.log("0");
  }
};

// const nb0 = function () {
//   if (count == 2) {
//     alert(`계산값은 ${firstNum + secondNum} 입니다`);
//   }
// };
