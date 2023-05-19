// 숫자 선택 (2개)를 선택 << 2개의 숫자를 저장해야한다. << 플레이어가 선택한 숫자를 기억해야하기 때문에
let firstNum;
let secondNum;
// let count =0;
let clickCount = 0;

// 카운트를 쓰느냐 안쓰냐
// 안쓰면 firstNum가 비어있는지 << 정의가 되지않았는지
// << undifined (정의가 되지 않은 변수의 값 ) || null
// count 가 뭐냐 몇번 클릭했는지, 즉 클릭한 횟수

function numSel1(num) {
  // let num; << 위에 (num)과 같다.
  // 함수 스코프({}) 안에서만 사용된다.
  // 함수 밖에서 선언된 전역변수, 지역변수 등 "이름이 같은 다른 변수"와 다른 변수다.
  // 밖에서 num = 1; 했어도 안에서는 undefined가 뜰 수 있다. << 호출 시() 안이 비어있다.
  // 이후 HTML 12번 줄에서 () 안에 7을 넣음으로써 "num = 7"로 정의한다.
  clickCount++;
  // 클릭했을 때 클릭한 횟수 증가
  if (clickCount == 1) {
    // console.log(clickCount);
    // 카운트를 증가시키는 코드(clickCount++) 이 위에 있기 때문에 1이 증가한 상태로 확인을 하게 된다.
    // 그래서 1일 때 한번 킄릭한 것이다.
    // firstNum = 7;
    firstNum = num;
  } else if (clickCount == 2) {
    // 위와 마찬가지로 2번 클릭하면 카운트가 증가 후 확인하기 때문에 2로 확인을 한다.
    // console.log("clickCount");
    // console.log(clickCount);
    // secondNum = 7;
    secondNum = num;
  }
}
// function numSel1() {
//   clickCount++;
//   if (clickCount == 1) {
//     firstNum = 8;
//   } else if (!clickCount == 2) {
//     secondNum = 8;
//   }
// }

function calculate(order) {
  if (clickCount < 2) return;
  // if (clickCount <2) return;
  // (주석 해석) < clickCount가 2 미만일 때, 즉 0이거나 1일떄, 다른 말로 숫자 클릭을 2번 이상 하지 않았을 때
  // 즉 숫자 2개가 아닐 때 return을 사용해서 함수를 멈춘다.

  switch (order) {
    case "+":
      alert(firstNum + secondNum);
      break;
    case "-":
      alert(firstNum - secondNum);
      break;
    case "/":
      alert(firstNum / secondNum);
      break;
    case "*":
      alert(firstNum * secondNum);
      break;
    case "%":
      alert(firstNum % secondNum);
      break;

    // default:
    //     break;
  }
}

function check() {
  // check 함수를 이용해서 현재 저장된 숫자들(변수)를 확인합니다.
  console.log(firstNum);
  console.log(secondNum);
}
