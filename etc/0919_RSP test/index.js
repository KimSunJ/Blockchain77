// document.write(comArr[0]);
// const comNum = parseInt(Math.random() * 3);
let start = 0;
let player1 = 0;
const slot = 0;
let money = 1000;
const coinArr = [20, 2, 1, 5, 3, 2, 3, 2, 3, 1, 2, 3, 7, 1];
const moneyElem = document.getElementById("money");

// const slotElem = document.getElementById("slot");

document.getElementById("c0").style.display = "none";
document.getElementById("c1").style.display = "none";
document.getElementById("c2").style.display = "none";

// const plus = (plus = 0) => {
//   if (isNaN(parseInt(coin))) return;
//   money += plus * 100;
//   console.log(`현재 잔액은 ${money}이네`);
moneyElem.innerHTML = money;
// };

// const coinInsert = document.getElementById("plus");

document.getElementById("start").onclick = () => {
  if (money < 100 || player1 !== 0) return; // 함수의 결과를 반환하고 끝낸다.
  // money += 1000;
  // console.log(start);
  player1++;
  console.log(document.getElementById("start"));
  document.getElementById("hand").style.animationDuration = "0.2s";

  // document.getElementById("c0").style.display = "none";
  // document.getElementById("c1").style.display = "none";
  // document.getElementById("c2").style.display = "none";
  money -= 100;
  moneyElem.innerHTML = money;
};

document.getElementById("player1").onclick = (e) => {
  let comSelect = Math.floor(Math.random() * 3);
  const hand = document.getElementById("hand");
  const tempParent = document.getElementById("player1");
  // console.log(e.target);
  console.log(comSelect);
  if (e.target.id == tempParent.id || player1 !== 1) return;
  player1++;

  hand.style.animationDuration = "0s";

  if (comSelect == 0) {
    hand.style.backgroundImage = `url("./hand_1.png")`;
  } else if (comSelect == 1) {
    hand.style.backgroundImage = `url("./hand_2.png")`;
  } else {
    hand.style.backgroundImage = `url("./hand_3.png")`;
  }

  // ===================================================================

  // console.log(e.target.id);
  // console.log(coms);
  // console.log(hand);
  // let playbtn = { p0, p1, p2 };

  // for (let i = 0; i < comRsp.length; i++) {
  //   comRsp[i] = parseInt(comRsp[i], 3);
  // }
  // console.log(typeof comRsp);
  // let comSel = comRsp[parseInt(Math.random() * comRsp.length)];
  // let handElem = document.getElementById("hand");
  // handElem = comSel;
  // handElem.innerHTML = handElem;

  // console.log(comSel);
  // let results = [playbtn, comRsp];

  switch (e.target.id) {
    case "p0":
      if (comSelect == 0) {
        document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("draw").style.textShadow = "none";
        }, 2000);
      } else if (comSelect == 1) {
        document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
        player1 = 0;

        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("lose").style.textShadow = "none";
        }, 2000);
      } else if (comSelect == 2) {
        //이겼을 경우
        document.getElementById("win").style.textShadow = "2px 3px 3px yellow";
        document.getElementById("winwin").style.textShadow =
          "2px 3px 3px yellow";

        let coin = coinArr[parseInt(Math.random() * coinArr.length)];
        console.log(`코인${coin * 100}원 얻었어`);
        console.log(typeof money);
        money += coin * 100;
        console.log(money);
        moneyElem.innerHTML = money;

        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("win").style.textShadow = "none";
          document.getElementById("winwin").style.textShadow = "none";
        }, 2000);
      }
      console.log("난 가위를 냈어");
      break;
    case "p1":
      if (comSelect == 0) {
        //이겼을 경우
        document.getElementById("win").style.textShadow = "2px 3px 3px yellow";
        document.getElementById("winwin").style.textShadow =
          "2px 3px 3px yellow";
        let coin = coinArr[parseInt(Math.random() * coinArr.length)];
        console.log(`코인${coin * 100}원 얻었어`);
        money += coin * 100;
        console.log(typeof money);
        console.log(money);
        moneyElem.innerHTML = money;
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("win").style.textShadow = "none";
          document.getElementById("winwin").style.textShadow = "none";
        }, 2000);

        // plus(coin);
        // moneyElem.innerHTML = coin;
      } else if (comSelect == 1) {
        //비겼을 경우
        document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
        // start = 0;
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("draw").style.textShadow = "none";
        }, 2000);
        //
      } else if (comSelect == 2) {
        //질 경우
        document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("lose").style.textShadow = "none";
        }, 2000);
      }
      console.log("난 주먹을 냈어");
      break;
    case "p2":
      if (comSelect == 0) {
        //졌을 경우
        document.getElementById("lose").style.textShadow = "2px 3px 3px blue";
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("lose").style.textShadow = "none";
        }, 2000);
      } else if (comSelect == 1) {
        //이겼을 경우
        document.getElementById("win").style.textShadow = "2px 3px 3px yellow";
        document.getElementById("winwin").style.textShadow =
          "2px 3px 3px yellow";
        let coin = coinArr[parseInt(Math.random() * coinArr.length)];
        console.log(`코인${coin * 100}원 얻었어`);
        money += coin * 100;
        console.log(typeof money);
        console.log(money);
        moneyElem.innerHTML = money;
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("win").style.textShadow = "none";
          document.getElementById("winwin").style.textShadow = "none";
        }, 2000);
      } else if (comSelect == 2) {
        document.getElementById("draw").style.textShadow = "2px 3px 3px blue";
        console.log("난 보를 냈어");
        player1 = 0;
        setTimeout(() => {
          document.getElementById("hand").style.animationDuration = "1s";
          document.getElementById("draw").style.textShadow = "none";
        }, 2000);
      }
      break;
  }
  return;
};
// let coin = coinArr[parseInt(Math.random() * coinArr.length)];
// console.log(`코인${coin * 100}원 얻었어`);
// plus(coin);

// 컴퓨터 애니메이션 다시 작동

// document.getElementById("slot").onclick = () => {
// document.getElementById("hand").style.animationPlayState = "running";
// document.getElementById("hand").style.animationDuration = "1s";
// document.getElementsByClassName("results-box").textShadow = "none";
// };
