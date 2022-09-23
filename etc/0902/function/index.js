// Function
// - fundamental building block in the program
// - subprogram can be used multiple times (재사용 가능)
// - performs a task or calculates a value

// 1. Function declaration
// function name (param1, param2) { body... return; }
// one function === one thing (하나의 함수는 한가지 일만 하도록 해야한다.)
// naming: doSomething, command, verb (무언가를 동작하는 것이기때문에 동사형태로 지정해줘야한다.)
// e.g. createCardAndPoint -> createCard, createPoint (세분화 하여 만들어야 함)
// function is object in JS (오브젝트의 일종이다.)
// (오프젝트로 간주하기 때문에 함수를 리턴할 수도, 파라미터로 전달이 되고, 변수에도 할당할 수 있다.)
function printHello() {
  console.log("Hello");
}
printHello();

function log(message) {
  console.log(message);
}
log("Hello@");
log(1234);

// 2. Parameters
// premitive pafameters: passed by value
// object parameters: passed by reference
function changeName(obj) {
  obj.name = "coder";
}
const ellie = { name: "ellie" };
changeName(ellie);
console.log(ellie);

// 3. Default parameters (added in ES6)
function showMessage(message, from = "unknown") {
  console.log(`${message} by ${from}`);
}
showMessage("Hi!");

// 4. Rest parameters (added in ES6)
function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
  for (const arg of args) {
    console.log(arg);
  }

  args.forEach((arg) => console.log(arg));
}
printAll("dream", "coding", "ellie");

// 5. Local scope
let globalMessage = "global"; //global variable
function printMessage() {
  let message = "hello";
  console.log(message); //local variable
  console.log(globalMessage);
}
printMessage();

// 6. Return a value
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); //3
console.log(`sum: ${sum(1, 2)}`);

// 7. Early return, early exit bad (현업에서 많이 사용)

// bad
// function upgradeUser(user) {
//   if (user.point > 10) {
//     //long upgrade logic...
//   }
// }

// good
// function upgradeUser {
//     if (user.point <=10) {
//         return;
//     }
// }

// first-class function
// functions are treated like any other variable
// can be assigned as a value to variable
// can be passed as an argument to other function
// can be returned by another function

// 1. Function expression
// a function declaration can be called earlier than it is defined. (hoisted)
// a function expression is created when the execution reaches it.
const print = function () {
  console.log("print");
};
print(); // << 함수 호출
const printAgain = print;
printAgain(); // << 함수 호출
const sumAgain = sum;
console.log(sumAgain(1, 3)); // << 함수 호출

// 2. Callback function using function expression (정답이 맞을 경우에만 호출하는 함수)
function randomQuiz(answer, printYes, printNo) {
  if (answer === "love you") {
    printYes();
  } else {
    printNo();
  }
}
const printYes = function () {
  console.log("Yes!");
};

const printNo = function print() {
  console.log("no!");
};
randomQuiz("wrong", printYes, printNo);
randomQuiz("love you", printYes, printNo);

// arrow function
// always annonymous
// const simplePrint = function () {
//   console.log("simplePrint!");
// };

// const simplePrint = () => console.log("simplePrint!");
const add = (a, b) => a + b;
const simpleMultiply = (a, b) => {
  //do something more
  return a * b;
};
// function, {}, return 생략해주는 것 =>

// IIFE : Immediately Invoked Function Expression
// 자기 함수를 바로 실행
(function hello() {
  console.log("IIFE");
})();
// (); 함수 호출
