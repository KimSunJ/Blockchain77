console.log("이것은 개발자 도구 콘솔창에 로그를 남기는 것이다.");
console.log("fabicon 어쩌구 하는 오류는 무시해라.");
// 안뜨는 경우도 있음 오류

console.log('1 === "1" : ' + (1 === "1"));
// 뒤의 것이 무엇인지 (text)를 출력하기 위한 문법

// 조건문, if && else if && else
if (1 < 2) {
  // 만약에 () 안이 참이면 {} 안의 코드를 실행한다.
  console.log("1 < 2는 true다");
} else {
  // if의 () 안에 있는 조건이 거짓이면 {} 안의 코드를 실행한다.
  console.log("1 > 2는 false다");
}

if (1 > 2) console.log("1 < 2는 true다");
// if에서 조건이 참이어서 해당 코드가 실행되면 else if, else 등 아래의 코드를 건너뛴다.
// 즉, 아래 코드는 실행하지 않는다.
else console.log("1 > 2는 false다");
// 한줄의 코드면 {}가 없어도 된다.
// 위의 if, else if의 조건이 모두 충족되지 않았을 때 최후의 보루로 실행되는 코드다.
// if (***) / ***과 console.log(""); 값이 거짓이면 아래 else 코드가 실행

// if (1 < 2) console.log("1 < 2는 true다");
// console.log('asdf')
// else console.log("1 > 2는 false다");
// if와 else if, else는 함께 붙어다녀야 한다.

// elseif 는 else와 if 합쳐진 것

if (1 < 2) {
  console.log("여기 조건이 거짓이면서");
} else if (2 > 3) {
  console.log("여기 조건이 참이면 else if의 {} 코드가 실행된다.");
} else {
  console.log("위의 if, else if의 모든 조건이 거짓일때 실행된다.");
}

console.log(1 < 2 ? "이건 참이야~" : "이건 거짓이야~");
// 조건 참일때 : 거짓일때 (: > else)
// 삼항연산자

let test1 = 10;
let test2 = 7;

if (test1 < test2) {
  console.log("꼴은 좀 보자.");
} else {
  console.log("꼴도 보기 싫다.");
}

let inputdata;
inputdata = prompt("넣고 싶은 값을 입력해 보세요.");
// switch는 여러 조건을 한번에 확인한다.
// prompt로 받는 내용은 전부 string 처리 (텍스트로 받는다.)
// 숫자로의 형변환 -> Number(***) || +** || parseInt(***) || parseFloat(***)
// ex) +ptompt 도 됨.
// 우리의 적 NaN
switch (inputdata) {
  // switch의 () 안에 있는 변수의 값을 확인한다.
  case "1":
    // case는 () 안에 있는 변수의 값이 같은지 확인한다.
    console.log("1을 넣었어.");
  // break 해당 명령어가 있는 지점에서 코드를 정지한다.
  // 반복문에서 다시 하고, 더 확실하게 알 수 있다.
  // break; 가 없으면 '3'을 입력하면 누적된 1,2의 결과값이 나온다.
  case "2":
    console.log("2을 넣었어.");
    break;
  case "3":
    console.log("3을 넣었어.");
    break;
  case "4":
    console.log("4을 넣었어.");
    break;
  default:
    // if else 에서 else와 같은 놈이다. 즉 case에서 걸리지 않으면 실행되는 마지막 보류이다.
    console.log("1~4까지만 넣어~");
}

for (let a = 0, b = 1; a < 10 && b > -2; ++a, --b) {
  // && 는 '그리고'다, 즉 두 조건이 한번에 만족해야 한다.
  console.log(`a = ${a}, b = ${b}`);
}

for (let a = 0, b = 1; a < 10 || b > -2; ++a, --b) {
  // || 는 '또는'다. 즉 두 조건 중 하나라도 만족하면 실행된다.
  // | -> shift + \
  console.log(`a = ${a}, b = ${b}`);
}

// 오늘의 숙제! 미연시 만들기
// prompt를 이용하여 입력값을 받아서 선택지를 선택하고
// 선택한 선택지에 따라서 다른 질문이 나와야하고
// 결론도 다르게 나와야 한다.
// 만약 1~4 번까지 선택지가 있을 때 5를 선택하면 다시 선택하게 해야함

// 컴퓨터가 1~100 사이의 하나의 숫자를 골라
// 사람이 하나의 숫자를 선택해
// 숫자를 맞추면 끝
// 못맞추면 대소 비교해서 UP (내가 선택한 숫자가 크다)
// Down(내가 선택한 숫자가 작다.)
// 총 몇번 입력했는지.
// 맞췄을때 '축하합니다, 몇번 입력하셨습니다'

console.log(Math.random());
// 0~1 까지의 랜덤수
// parseInt(***)
