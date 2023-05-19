// 함수란, 기능을 실행하는 코드에 이름을 지은 것이다.
// 변수가 데이터에 이름을 짓는다.
// 함수는 실행하는 코드에 입력하는 것이다.
function test() {
  // function 이름 () {
  // {} 안에 실행할 코드가 들어갑니다.
  // () 안에는 함수를 사용할 때 함수에게 줄 정보를 입력합니다. (매개변수)

  console.log("넣고싶은 걸 넣어봐");
}
// <<정의하고 초기화함
function test1() {
  console.log("함수를 초기화합니다.");
  console.log("해당 형식으로 함수를 초기화 하는 방식 : 함수 선언문");
  // function 이름 () {} << 함수 선언문이다.
}
let test2 = function () {
  console.log("함수를 초기화합니다.");
  console.log("해당 형식으로 함수를 초기화 하는 방식 : 함수 표현식");
  // 변수에다가 함수를 보냄
  // const/let 이름 = function(){} << 함수 표현식이다.
};
const test3 = () => {
  console.log("함수를 초기화합니다.");
  console.log("해당 형식으로 함수를 초기화 하는 방식 : 화살표 함수");
  // const/let 이름 = () => {}
};
// 결과물 자체는 같고, 함수를 나타낸 것에서 차이점
// 함수도 변수와 마찬가지로 가져와서 사용해야 한다.

test1();
test2();
test3();
// 함수를 호출합니다. 즉, 함수에 있는 코드를 실행합니다.

// 매개변수란, 함수에게 데이터를 전달한다.
// 함수가 사용해야할 데이터를 호출할때 전해준다

function addFunc(firstNum, secondNum) {
  // firstNum, secondNum가 매개변수다.
  console.log(firstNum + secondNum);
  //   정의와 호출만 한 상태
  //   return firstNum;
  //   return secondNum;
}

addFunc(2, 3);
// 2가 firstNum 이고 3이 secondNum이다.

function addFunc2(firstNum, secondNum) {
  return firstNum + secondNum;
  // return, 되돌린다, 반환값(정식명칭) addFunc2가 끝났을 때 함수가 반출하는 돌려주는 값이다.
}

let answer = addFunc2(6, 13);
console.log(answer);
// addFunc2 함수는 return이 있기 때문에 answer 변수에 addFunc2의 return 값이 정의된다.
// 현재 19가 정의된다.
// 앞에 addFunc2 << 에다가 return값이 있기 때문에 다음 값으로 넘어감
// const comSel = parseInt(Math.random() * 99 + 1); >>parsInt가 함수
answer = addFunc(56, 3);
// fuction addFunc 에서의 콘솔 찍어준 계산값을 다시 돌아가서 호출하여 자동으로 계산한 것이다.
console.log(answer);
// addFunc 함수는 return이 없기 때문에 answer 변수에 '정의되지 않았다'를 뜻하는 undefined가 정의된다. (반환하는 값이 없기 떄문에)

console.log(Math.random());
// random값을 리턴해준다.
console.log(console.log("asdf"));
// >>매개변수에 로그를 남김 / console 함수는 return값이 없다.
// 정해진 것이 없기 때문에 매개변수를 console.log 안에 넣을 수 있다.
console.log(addFunc2(1, 2));
console.log(console.log(addFunc2(1, 2)));
// 제일 밖의 콘솔 로그를 실행했더니 매개변수로 2번째 콘솔로그
// 2번째 콘솔로그를 실행 -> 매개변수로 addFunc2
// addFunc2 실행 -> return 1+2 => 3
// 2번째 콘솔로그가 3을 로그 출력
// 2번째 콘솔로그가 return 값을 첫번째 콘솔로그가 로그로 출력하는데,
// 콘솔로그는 return 값이 없다. -> undefined
// 함수는 어딘가에 반복적으로 사용하기 위해 만든 것

function sel(num) {
  // 함수 선언 후 num를 받는다
  switch (num) {
    case 1:
      return "검";
      //  함수는 return에서 그자리서 반환 되면 끝나기 때문에
      // 함수는 return이 정해지는 순간 끝난다. 때문에 아래 함수는 의미가 없어진다.
      console.log("검을 선택했어요.");
      break;
    case 2:
      return "활";
      break;
    case 3:
      return "방패";
      break;
    case 4:
      return "도끼";
      break;
    default:
      return false;
  }
  console.log("???");
  // default 값이 아래로 영향을 끼쳐서 함수는 switch문에서 끝났다.
}

let playerSel;
// 플레이어 선택을 받는다, 처음에 선언만 했기 때문에 undefined
do {
  playerSel = prompt("무기를 선택하세요.");
  // 플레이어의 선택을 받는다.
  // 입력할때까지 대기
  playerSel = sel(parseInt(playerSel)); // << false
  // sel 함수를 호출하며 위에서 받은 플레이어의 선택을 정수로 바꾸어 전달한다.
  // sel은 받은 정수(매개변수, 플레이어 선택한 수)를 사용해서 값을 반환한다.
  // sel이 반환한 값을 playerSel에 다시 정의한다. (재정의)
} while (!playerSel);
// playerSel이 false면 계속 반복한다.
console.log(playerSel);
