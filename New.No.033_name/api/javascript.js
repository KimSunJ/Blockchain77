// javascript는 prototype이다.
// 변수는 저장할 데이터의 이름이다.
//  const, let, var
//  var는 hoisting(호이스팅)이 가능하다.
//  저장한 데이터의 이름이기 때문에 호출하면 저장된 데이터를 가져온다, 출력한다, 사용한다
//  const는 변경 불가능하다. << 재정의가 불가능하다.
//  let은 같은 이름을 사용하지 못한다 << 재선언이 불가능하다.
//  let은 다른 데이터를 다시 저장할 수 있다. << 변경이 가능하다, << 재정의가 가능하다.
//  var는 마음대로 마구잡이로 사용 가능하다. << 같은 이름을 사용할 수 있다. << 재선언이 가능하다.
//  단, var는 덮어쓴다

// console.log(constA); << hoisting 불가능
// console.log(letA); << hoisting 불가능
console.log(varA); // << hoisting 가능

const constA = 1;
// constA = 2; << 재정의 불가능
// const constA = 3; << 재선언 불가능
let letA = 1;
letA = 2;
// let letA = 3; << 재선언 불가능
var varA = 1;
varA = 2;
var varA = 3;

// 자료형
// string, number, boolean, Array, null, Object, undefined, Symbol
// string : 문자열
// number : 숫자
// boolean : 참거짓
// array : 배열
// null : 비어있는 값 / 비어있다고 정의한 값
// Function : 함수
// Object : 객체
// undefined : 선언을 했지만 입력하지 않은 값 / 그냥 빈값(정의하지 않았다)
// Symbol : 절대적으로 중복되지 않는 값 / 'asdf'를 2개를 선언했으면 두 값은 같은 값일까?
console.log("asdf" == "asdf");
console.log(Symbol("asdf") == Symbol("asdf")); // false

const constB = 1;
console.log(constA == constB);

console.log(typeof constA);
console.log(typeof constA.toString());
console.log(typeof 1);
console.log(typeof (1).toString());
console.log("asdf".toUpperCase());

console.log(typeof "123");
console.log(typeof +"123");
console.log(typeof parseInt("123"));
console.log(typeof Math.floor("123"));
console.log(typeof parseFloat("123"));
console.log(typeof Number("123"));

console.log((132).toString());
console.log(Boolean(123));
console.log(!!132);

console.log([1].push(10)); // 배열의 length를 리턴한다. push는 제일 뒤에 아이템을 추가한다.
console.log([1, 2, 3, 4].pop()); // pop은 맨 뒤의 아이템을 제거한다. 뭘 제거했는지 보여주기 위해 제거한 아이템을 반환한다.
console.log([1].unshift(4)); // 제일 앞에 아이템을 추가한다.
console.log([10, 1].shift()); // 제일 앞에 아이템을 제거한다. / pop과 마찬가지로 제거한 아이템을 반환한다.

// [].join() << 아이템을 string으로 연결, 매개변수로 받은 string을 아이템 중간에 삽입
// [].filter() << 내가 원하는 data만 배열로 반환한다.
// [].find() << 깊이 찾다, 객체 내의 데이터들을 확인하여 찾을때 사용, 찾은 아이템을 반환한다.
// [].findIndex() << 깊이 찾는 것, 객체 내의 데이터들을 확인하여 찾을 때 사용한다. 찾은 아이템의 index를 반환한다.
// [].indexOf() <<  얕게 찾는 것, 데이터 자체를 찾아 그 아이템의 index를 반환한다. 객체일 경우에 그 객체 자체로 찾아야 한다.
// [].forEach() << for문
// [].map() << 배열의 아이템을 변화시키고 싶을 때 사용한다, 각 아이템에 대해서 매개변수 함수를 실행하고, 그 반환 값을 배열에 넣어서 반환한다.
// [].slice() << 자르기
// [].splice() << 자르기(원본 훼손)
// [].reduce() << 합하기(join 메서드는 단순하게 string이지만 reduce는 내맘대로 할 수 있다.
//              (ex_모든 학생의 과학 점수를 합할 수 있다. << 모든 학생이라는 말은 학생들의 배열 / 과학 점수라는 말은 각 학생이 여러 점수를 갖고 있는데 그 중에 과학 점수만을 뜻함(점수가 객체로 저장) / '합할 수 있다.'라는 말은 객체 내의 프로퍼티(키)를 사용하여 각 값을 더할 수 있다.)
// [].reverse() << 순서 뒤집기
// [].sort() << 정렬
// [].concat() => [...A, ...B] 형태로도 사용 가능 / ... (스프레드) << 배열 합치기

// Object
// 객체 : 키와 값으로 이루어져 있다, key : value
// 선언은 {}로 묶어서 선언한다.
const tempObj = { a: 1, b: 2 };
let a = 1;
let b = 2;
tempObj.a; //-> 1
tempObj.b; //-> 1
tempObj.a = 3; //->
// 프로퍼티(키값)는 간단하게 생각해서 {} 안에 있는 변수이다.
// 객체 안에 프로퍼티로 객체가 가능하다.
const tempObj1 = { data: { data: { list: 1 } } };
tempObj1.data.data.list;
tempObj1["data"]["data"]["list"];
const tempKey = "data";
console.log(tempObj1[tempKey][tempKey][tempKey]);
// node.js에서 express 서버를 생성하고 axios를 생성하고, 데이터를
const tempArr = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
console.log(tempArr.findIndex((item) => item.a === 1));
console.log(tempArr.indexOf(tempObj));
console.log({ a: "asdf" } == { a: "asdf" });
const tempObj2 = tempObj;
console.log(tempObj2 === tempObj);
const tempObj3 = { ...tempObj, be: 1, a: 6 };
// { ...tempObj, be: 1, a:6 } => {a: 1, b: 2, be: 1, a: 6} => {a: 6, b: 2, be: 1}
console.log(tempObj3);
console.log(tempObj);
console.log(tempObj3 === tempObj);

console.log(...[1, 2, 4, 3]);
[1, 2, 4, 3].reduce((prev, curr) => prev + curr, 0);
// prev = 0, curr = 1, result = 1 => prev = 1, curr =2, result = 3 => prev = 3, curr = 3, result = 6 => prev = 6, curr = 4 result = 10
console.log(
  [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }].reduce((prev, curr) => {
    const temptemp = prev.length ? prev[prev.length - 1] : { a: 0 };
    prev.push({ a: temptemp.a + curr.a });
    return prev;
    // curr.a 객체의 a
  }, [])
);

// Function
// 함수 : 기능(코드)을 실행

funcA(2);
function funcA(b) {
  console.log(b);
}
funcA(1);
// 함수 선언문은 호이스팅이 가능함

// funcB("asdf");
// let funcB = function (a) {
//   console.log(a);
// };
// funcB("asdf");
// 표현식은 호이스팅이 안된다

// funcC("asdf");
// var funcC = function (a) {
//   console.log(a);
// };

let funcD = (a) => {
  console.log(a);
};
// 화살표 함수

let funcE = (a) => console.log(a);
funcE("sdfsdf");

let funcF = (a, b) => a + b;
// 화살표 함수에서 {}를 사용하면 return 값으로 보내야한다.
let funcG = (a, b) => {
  return a + b;
};

console.log(funcF(1, 2));
console.log(funcG(1, 2));

console.log([1, 2, 3, 4].reduce(funcF, 0));

// [].forEach()
console.log([1, 2, 3, 4].forEach((item) => item)); // >> undefined
// [].map();
console.log(
  "map:",
  [1, 2, 3, 4].map((item) => !!(item % 2))
); // << [1, 2, 3, 4]

// console.log([1, 2, 3, 4].filter((item) => item % 2 === 0));
console.log([1, 2, 3, 4].filter((item) => !(item % 2)));

//"".indexOf() >> number

console.log([1, 2, 3, 4].reverse());
console.log([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }].reverse().join);
