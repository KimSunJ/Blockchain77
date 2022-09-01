// scope라는 것이 있다.
// scope는 {}로 묶인 것입니다.
// {}를 스코프라고 부른다.
// 그래서 scope란?
// 지역을 나타낸다.
// 지역이란 건 일종의 부분이라고 생각.

let a = 0;
// 모든 곳에서 사용 가능한 변수를 전역 변수
console.log(a);
{
  //  a = 2;
  let a = 2;
  // 지역 스코프 내에서 전역 변수가 다시 선언될 경우 (재선언)
  // 전역 스코프의 변수와는 다른 변수가 된다.(같은 이름이지만 다른 데이터를 갖는다.)
  //  지역 스코프 내에서 정의만 할 경우 전역 스코프로 갖고 나올 가능성이 있다.
  let b = 1;
  //  b는 안에서 선언했기 때문에 안에서 끝났다 (선언값이)
  //  안에서 선언된 변수를 지역 번수
  //  지역 변수는 해당 스코프 내에서만 사용 가능하다.
  console.log(a + b);
  console.log(a);
}
// {} 묶인 곳을 지역 스코프
console.log(a);
// a 는 바깥에서 선언해줬기 떄문에 결과값이 나옴
// console.log(b);
// 바깥은 전역 스코프라고 부른다
// 전역변수 {지역 변수} 전역변수

function addA(a) {
  // let a; 한것과 같음
  a++;
  console.log(a);
}

let obj = {
  a: 1,
  func1: function () {
    console.log("돼");
  },
  func: (fn, sn) => {
    return fn + sn;
  },
};

obj.func1();

console.log(obj.func(1, 2));
// 객체 안에 포함된 함수는 메서드라고 부릅니다.
// console 객체 안의 log 메서드
// Math 객체 안의 random 메서드
// obj 객체 안의 func1, func 메서드

alert("경고!");
