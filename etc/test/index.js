let comNum1, comNum2, comNum3;
let count = 0;

const maxCount = 9;

let userNum1, userNum2, userNum3;

comNum1 = parseInt(Math.random() * 9 + 1);
console.log(comNum1);

do {
  comNum2 = parseInt(Math.random() * 9 + 1);
} while (comNum1 == comNum2);
console.log(comNum2);

do {
  comNum3 = parseInt(Math.random() * 9 + 1);
} while (comNum1 == comNum3 || comNum3 == comNum2);
console.log(comNum3);

const userNum = alert(
  `${count}\n컴퓨터가 선택한 숫자를 맞춰주세요/ 최대 : ${maxCount} / 남은 횟수 : ${
    maxCount - count
  }`
);

// 첫번째 숫자
userNum1 = prompt("컴퓨터가 선택한 첫번째 숫자를 맞춰주세요");

userNum1 = parseInt(userNum1);

if (
  (userNum1 == comNum1 && userNum1 != comNum2) ||
  (userNum1 == comNum1 && userNum1 != comNum3)
) {
  alert("STRIKE!!! ( ु ´͈ ᵕ `͈ )ु");
  console.log("스트라이크!");
}
if (
  (userNum1 != comNum1 && userNum1 == comNum2) ||
  (userNum1 != comNum1 && userNum1 == comNum3)
) {
  alert("BALL!!! ∠( ᐛ 」∠)＿");
  console.log("보~올!");
} else if (
  (userNum1 != comNum1 && userNum1 != comNum2) ||
  (userNum1 != comNum1 && userNum1 != comNum3)
) {
  alert("OUT!!! ૮˃̵֊ ˂̵ ა");
  console.log("아우웃!!!!!!");
}

// 두번째 숫자

userNum2 = parseInt(userNum2);

userNum2 = prompt("컴퓨터가 선택한 두번째 숫자를 맞춰주세요");
if (
  (userNum2 == comNum2 && userNum2 != comNum1) ||
  (userNum2 == comNum2 && userNum2 != comNum3)
) {
  alert("STRIKE!!! ( ु ´͈ ᵕ `͈ )ु");
  console.log("스트라이크!");
}
if (
  (userNum2 != comNum2 && userNum2 == comNum1) ||
  (userNum2 != comNum2 && userNum2 == comNum3)
) {
  alert("BALL!!! ∠( ᐛ 」∠)＿");
  console.log("보~올!");
} else if (
  (userNum2 != comNum2 && userNum2 != comNum1) ||
  (userNum2 != comNum2 && userNum2 != comNum3)
) {
  alert("OUT!!! ૮˃̵֊ ˂̵ ა");
  console.log("아우웃!!!!!!");
}

// 세번째 숫자
userNum3 = parseInt(userNum3);

userNum3 = prompt("컴퓨터가 선택한 세번째 숫자를 맞춰주세요");

if (
  (userNum3 == comNum3 && userNum3 != comNum1) ||
  (userNum3 == comNum3 && userNum3 != comNum2)
) {
  alert("STRIKE!!! ( ु ´͈ ᵕ `͈ )ु");
  console.log("스트라이크!");
}
if (
  (userNum3 != comNum3 && userNum3 == comNum1) ||
  (userNum3 != comNum3 && userNum3 == comNum2)
) {
  alert("BALL!!! ∠( ᐛ 」∠)＿");
  console.log("보~올!");
} else if (
  (userNum3 != comNum3 && userNum3 != comNum1) ||
  (userNum3 != comNum3 && userNum3 != comNum2)
) {
  alert("OUT!!! ૮˃̵֊ ˂̵ ა");
  console.log("아우웃!!!!!!");
}
