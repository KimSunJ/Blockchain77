// document.write(comArr[0]);
// const comNum = parseInt(Math.random() * 3);

let money = 1000;
let moneyElem = document.getElementById("money");
moneyElem.innerHTML += "<p>" + money + "₩" + "</p>";

let start = 0;
let player1 = 0;

document.getElementById("start").onclick = () => {
  // console.log(start);
  console.log(document.getElementById("start"));
  document.getElementById("hand").style.animationDuration = "0.2s";
  money -= 100;
  moneyElem.innerHTML = "<p>" + money + "₩" + "</p>";
  if ((money = 100)) {
    document.getElementById("start").onclick = false;
  }
  // console.log(start);
  //else if (money == 0) {
  // moneyElem.innerHTML = "<p>" + money + "₩" + "</p>";
  // } >> 다시 누를 수 있을 때 확인
};

// ===================================================
// 가위바위보 클릭을 하면 컴픀터 가위바위보가 멈춘다.
// 도전 버튼을 안누르고 플레이어 버튼을 먼저 누를 경우 alert가 떠야한다. (어떻게 할까?)
let c1 = document.getElementById("1");
let c2 = document.getElementById("0");
let c3 = document.getElementById("2");
let p1 = document.getElementById("p0");
let p2 = document.getElementById("p1");
let p3 = document.getElementById("p2");

document.getElementById("player1").onclick = () => {
  player1++;
  // document.getElementById("hand").style.animationDuration = "1s";
  document.getElementById("hand").style.animationPlayState = "paused";
  if (money > 1000) {
    alert("Hey! Insert coin");
  }

  // 가위바위보 선택할 경우 컴퓨터도 선택하고, 플레이어도 선택한다.
  comSel = parseInt[(c1: "0", c2: "1", c3:"-1")];
  playSel = parseInt[(p1, p2, p3)];

  const scoreTable = [0, 1, 2];
  console.log(scoreTable);
  const playScore = scoreTable[playSel];
  const comScore = scoreTable[comSel];
  console.log(comSel);
  console.log(playSel);

  const res = playScore - comScore;
  console.log(res);
  if ([res === 2 || res === -1]) {
    document.getElementById("winwin").style.textShadow = "2px 3px 6px yellow";
    document.getElementById("win").style.textShadow = "2px 3px 6px yellow";
    console.log("승리");
  } else if ([res === -2 || res === 1]) {
    document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
    console.log("패배");
  } else {
    document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
    console.log("무승부");
  }
};

// ===================================================

// 코인 얻는 것 구현
// let gcoin = document.getElementById("getcoin");
// gcoin = [];

// [res === 2 || res === -1] >> [2, -1].includes(res);
// switch (e.target.id) {
//   case "p0":
//     if (hand === coms) {
//       document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
//     } else if (hand === comr) {
//       document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
//     } else if (hand === comp) {
//       document.getElementById("win").style.textShadow = "2px 3px 3px yellow";
//       document.getElementById("winwin").style.textShadow =
//         "2px 3px 3px yellow";
//       // let random = coinArr[parseInt(Math.random() * coinArr.length)];
//       // console.log(`코인${random * 100}원 얻었어`);
//       // plusmoney(random);
//     }
//     console.log("난 가위를 냈어");
//     break;
//   case "p1":
//     if (hand === coms) {
//       document.getElementById("win").style.textShadow = "2px 3px 3px yellow";
//       document.getElementById("winwin").style.textShadow =
//         "2px 3px 3px yellow";
//       // let random = coinArr[parseInt(Math.random() * coinArr.length)];
//       // console.log(`코인${random * 100}원 얻었어`);
//       // plusmoney(random);
//     } else if (hand === comr) {
//       document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
//     } else if (hand === comp) {
//       document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
//     }
//     console.log("난 주먹을 냈어");
//     break;
//   case "p2":
//     if (hand === coms) {
//       document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
//     } else if (hand === comr) {
//       document.getElementById("win").style.textShadow = "2px 3px 3px yellow";
//       document.getElementById("winwin").style.textShadow =
//         "2px 3px 3px yellow";
//       // let random = coinArr[parseInt(Math.random() * coinArr.length)];
//       // console.log(`코인${random * 100}원 얻었어`);
//       // plusmoney(random);
//     } else if (hand === comp) {
//       document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
//     }
//     console.log("난 보를 냈어");
//     break;
// }