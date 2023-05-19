let start = 0;
let player1 = 0;
const slot = 0;
let money = 1000;
const coinArr = [20, 2, 1, 5, 3, 2, 3, 2, 3, 1, 2, 3, 7, 1];
const moneyElem = document.getElementById("money");

document.getElementById("c0").style.display = "none";
document.getElementById("c1").style.display = "none";
document.getElementById("c2").style.display = "none";

document.getElementById("get").onclick = () => {
  console.log("get");
  player1++;
  document.getElementById("slot").style.animation = "get-mario 1s linear";
};

moneyElem.innerHTML = money;

document.getElementById("start").onclick = () => {
  if (money < 100 || player1 !== 0 || get == 0) return;

  player1++;

  document.getElementById("hand").style.animationDuration = "0.2s";

  money -= 100;
  moneyElem.innerHTML = money;
};

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

  let coin = coinArr[parseInt(Math.random() * coinArr.length)];
  (e.target.id == "p0" && comSelect == 0) ||
  (e.target.id == "p1" && comSelect == 1) ||
  (e.target.id == "p2" && comSelect == 2)
    ? ((document.getElementById("draw").style.textShadow = "2px 3px 3px blue"),
      (player1 = 0))
    : (e.target.id == "p0" && comSelect == 1) ||
      (e.target.id == "p1" && comSelect == 2) ||
      (e.target.id == "p2" && comSelect == 0)
    ? ((document.getElementById("lose").style.textShadow = "2px 3px 3px blue"),
      (player1 = 0))
    : ((document.getElementById("mario").style.animationDuration = "0.5s"),
      (document.getElementById("stop").onclick = () => {
        document.getElementById("mario").style.animationPlayState = "paused";
      }),
      (document.getElementById("win").style.textShadow = "2px 3px 3px yellow"),
      (document.getElementById("winwin").style.textShadow =
        "2px 3px 3px yellow"),
      (money += coin * 100),
      (moneyElem.innerHTML = money),
      (player1 = 0),
      console.log(money));

  setTimeout(() => {
    document.getElementById("hand").style.animationDuration = "1s";
    document.getElementById("mario").style.animationDuration = "2s";
    document.getElementById("mario").style.animationPlayState = "running";
    document.getElementById("win").style.textShadow = "none";
    document.getElementById("winwin").style.textShadow = "none";
    document.getElementById("draw").style.textShadow = "none";
    document.getElementById("lose").style.textShadow = "none";
  }, 3000);
};
