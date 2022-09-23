//primitive, single item: number, string, boolean, null, undefined, symbol,
// object, box container
// function, first-class function

//number
const count = 17; // integer
const size = 17.1; // decimal number
console.log(`value: ${count}, type:${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);

//1. String concatenation
console.log("my" + "cat");
console.log("1" + 2);
console.log(`string literals: 1 + 2 = ${1 + 2}`);

//2. Numeric operators
console.log(1 + 1); //add
console.log(1 - 1); //substract
console.log(1 / 1); //divide
console.log(1 * 1); //multiply
console.log(1 % 1); //remainder
console.log(2 ** 3); //exponentiation

//3. Increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
//counter = counter + 1;
//preIncrement = counter;
console.log(`preIncrement : ${preIncrement}, counter:${counter}`);
const postIncrement = counter++;
// postIncrement = counter;
// counter = counter + 1;
console.log(`preIncrement : ${preIncrement}, counter:${counter}`);

//4. Assigment operators
let x = 3;
let y = 6;
x += y; //x = x + y;
x -= y;
x * y;
x /= y;

//5. Comparison operators
console.log(10 < 6); //less than
console.log(10 <= 6); //less than or equal
console.log(10 > 6); //greater than
console.log(10 >= 6); //greater than or equal

//6. Logical operators: || (or), && (and), ! (not)
const value1 = true;
const value2 = 4 < 2;
// || (or), finds the first truthy value
console.log(`or: ${value1 || value2 || check()}`);

// && (and), finds the first falsy value
console.log(`or: ${value1 || value2 || check()}`);

// often used to compress long if-statement
// nullableObject && nullableObject.something

function check() {
  for (let i = 0; i < 10; i++) {
    //wasting time
    console.log("");
  }
  return true;
}

// ! (not)
console.log(!value1);

// 7. Equality
const stringFive = "5";
const numberFive = 5;

// == loose equality, with type conversion / 생김새만 같으면 true
console.log(stringFive == numberFive);
// type을 변경하여 비교
console.log(stringFive != numberFive);

// === strict equality, no type conversion / 타입이 다른지 검사
console.log(stringFive === numberFive);
console.log(stringFive !== stringFive);

// object equality by reference
const ellie1 = { name: "ellie" };
const ellie2 = { name: "ellie" };
const ellie3 = ellie1;
console.log(ellie1 == ellie2);
console.log(ellie1 === ellie2);
console.log(ellie1 === ellie3);

// equality - puzzler
console.log(0 == false);
console.log(0 === false);
console.log("" == false);
console.log("" === false);
console.log(null == undefined);
console.log(null === undefined);

// 8. Conditional operators: if
// if, else if, else
const name = "df";
if (name === "ellie") {
  console.log("Welcome, Ellie!");
} else if (name === "coder") {
  console.log("You are amazing coder");
} else {
  console.log("unkwnon");
}

// 9. Ternary operator: ?
// condition ? value1 : value2;
console.log(name === "ellie" ? "yes" : "no");

// 10. Switch statement
// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in TS
const browser = "Firefox";
switch (browser) {
  case "IE":
    console.log("go away");
    break;
  //   case "chrome":
  //     console.log("love you!");
  //     break;
  //   case "Firefox":
  //     console.log("love you!");
  //     break;
  case "chrome":
  case "Firefox":
    console.log("love you!");
    break;
  default:
    console.log("same all!");
    break;
}
// 11. Loops
// while loop, while the condition is truthly,
// body code is executed.
let i = 3;
while (i > 0) {
  console.log(`while: ${i}`);
  i--;
}
// 조건이 맞을때만 실행하고 싶으면 while까지만 실행

// do while loop, body code is executed first,
// than check the condition.
do {
  console.log(`do while: ${i}`);
  i--;
} while (i > 0);
// 출력이 먼저 되고 나서 확인해서 조건이 맞으면 실행되는 것

// for loop, for(begin; condition; step)
for (i = 3; i > 0; i--) {
  // 값이 맞을때까지 반복
  console.log(`for:${i}`);
}

for (let i = 3; i > 0; i = i - 2) {
  // 지역변수를 안에서 작성해서 선언하여 반복 가능
  //inline variable declaration
  console.log(`inline variable for: ${i}`);
}
// break : 반복을 완전히 끝내는 것
// continue : 지금 것만 스킵하고 다시 다음으로 넘어가는 것.
// 01.  0 to 10까지 짝수를 continue를 사용하여 작성
for (let i = 0; i < 11; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(`q1.${i}`);
}

// 02.  0 to 10까지 반복하되 숫자 8이 나오면 그만하도록 작성
for (let e = 0; e < 9; e++) {
  console.log(`e: ${e}`);
}

let h = 1;
while (h < 101) {
  console.log(h);
  h++;
}
