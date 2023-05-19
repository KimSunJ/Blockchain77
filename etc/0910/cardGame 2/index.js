let cards = [];

for (let i = 0; i < 8; i++) {
  cards.push(i + 1);
  cards.push(i + 1);
}

cards = shuffle(100, cards);

console.log(cards);

let firstCardIdx = -1;
let secondCardIdx = -1;
function playNum(cardNum) {
  console.log("firstCardIdx :" + firstCardIdx);
  console.log("secondCardIdx :" + secondCardIdx);
  const tempElem = document.getElementById("card" + cardNum);
  // 현재 선택한 카드
  //   console.log(tempElem);
  const firstElem = document.getElementById("card" + firstCardIdx);
  // 첫번째 선택한 카드의 태그가 정의됩니다.
  const secondElem = document.getElementById("card" + secondCardIdx);
  //  매개변수로 받은 cardNum는 id의 'card' 뒤에 붙은 숫자와 동일하게 되어 있으며 cardNum와 'card'를 붙여서 id를 찾아옵니다.
  if (tempElem.innerHTML) return;
  // 클릭한 div에 값이 있는가? << 선택하거나 맞춘 카드인가?
  console.log("fg");
  if (firstCardIdx > -1 && secondCardIdx > -1) {
    // 카드 두장으로 모두 선택했는가?
    if (cards[firstCardIdx] !== cards[secondCardIdx]) {
      // 카드 두장이 다른가?
      firstElem.innerHTML = "";
      secondElem.innerHTML = "";
    }
    // 카드를 다시 뒤집는다.
    else {
      firstElem.style.background = "lightgreen";
      secondElem.style.background = "lightgreen";
    }
    firstCardIdx = -1;
    secondCardIdx = -1;
    // 선택한 카드들에 대한 위치 정보를 없앤다.
  }
  console.log("sdf");
  //  선택이 됐을경우 선택이 안된 것이라는 의미인 -1을 선택한다.
  if (firstCardIdx < 0) {
    // 첫번째 카드를 선택하지 않았는가?
    firstCardIdx = cardNum;
    // 첫번째 카드의 index(cards 기준)를 정의한다.
    tempElem.innerHTML = cards[cardNum];
  } else if (secondCardIdx < 0) {
    // 두번째 카드를 선택하지 않았는가?
    secondCardIdx = cardNum;
    tempElem.innerHTML = cards[cardNum];
  }
}
