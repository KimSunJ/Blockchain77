let start = 0;
let player1 = 0;
const slot = 0;
let money = 1000;
const coinArr = [20, 2, 1, 5, 3, 2, 3, 2, 3, 1, 2, 3, 7, 1];
const moneyElem = document.getElementById("money");

document.getElementById("c0").style.display = "none";
document.getElementById("c1").style.display = "none";
document.getElementById("c2").style.display = "none";

moneyElem.innerHTML = money;

document.getElementById("start").onclick = () => {
  if (money < 100 || player1 !== 0 || get == 0) return;

  player1++;

  document.getElementById("hand").style.animationDuration = "0.2s";

  money -= 100;
  moneyElem.innerHTML = money;
};

function reset() {
  setTimeout(() => {
    document.getElementById("hand").style.animationDuration = "1s";
    document.getElementById("mario").style.animationDuration = "2s";
    document.getElementById("mario").style.animationPlayState = "running";
    document.getElementById("win").style.animation = "";
    document.getElementById("winwin").style.animation = "";
  }, 1800);
}

let count = 0;
let changeCount = 1;
let movingYosi;

function marioYosi() {
  movingYosi = setTimeout(function () {
    count += changeCount;

    if (count == 14) {
      changeCount = -1;
    }
    if (count == 0) {
      changeCount = 1;
    }
    marioYosi();
    console.log(count);
  }, 2000 / 14);
}

document.getElementById("player1").onclick = (e) => {
  let comSelect = Math.floor(Math.random() * 3);
  const hand = document.getElementById("hand");
  const tempParent = document.getElementById("player1");

  if (e.target.id == tempParent.id || player1 !== 1) return;
  player1++;

  hand.style.animationDuration = "0s";

  if (comSelect == 0) {
    hand.style.backgroundImage = `url("./hand_1.png")`;
  } else if (comSelect == 1) {
    hand.style.backgroundImage = `url("./hand_2.png")`;
  } else if (comSelect == 2) {
    hand.style.backgroundImage = `url("./hand_3.png")`;
  }

  (e.target.id == "p0" && comSelect == 0) ||
  (e.target.id == "p1" && comSelect == 1) ||
  (e.target.id == "p2" && comSelect == 2)
    ? ((document.getElementById("draw").style.animation = "Effect 0.5s 3"),
      (player1 = 0),
      reset())
    : (e.target.id == "p0" && comSelect == 1) ||
      (e.target.id == "p1" && comSelect == 2) ||
      (e.target.id == "p2" && comSelect == 0)
    ? ((document.getElementById("lose").style.animation = "Effect 0.5s 3"),
      (player1 = 0),
      reset())
    : ((document.getElementById("mario").style.animation = ""),
      (document.getElementById("win").style.animation = "Effect 0.5s infinite"),
      (document.getElementById("winwin").style.animation =
        "Effect 0.5s infinite"),
      (document.getElementById("mario").style.animationDuration = "0.5s"),
      marioYosi(),
      (document.getElementById("stop").onclick = () => {
        document.getElementById("mario").style.animationPlayState = "paused";
        clearTimeout(movingYosi);
        coin = coinArr[count];
        money += coin * 100;
        moneyElem.innerHTML = money;
        player1 = 0;
        reset();
      }));
};

// 비겼을 경우 ? 비기는 효과 : 질 경우? 지는 효과 : 둘다 false 면 이기는 효과
// document.getElementById("get").onclick = () => {
//   player1++;
//   document.getElementById("slot").style.animation = "get-mario 1s linear";
// };
