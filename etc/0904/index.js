let playNum1, playNum2, playNum3;
let comNum1, comNum2, comNum3;
let count = 0;

const comArr = function () {
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
};

let start;

do {
  start = prompt("시작이오");
} while (!playerSel);
console.log(playerSel);

const comArr = [comNum1, comNum2, comNum3];

const comArr = function () {
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
};
