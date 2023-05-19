const comSel = parseInt(Math.random() * 99 + 1);

// 컴퓨터 선택 완료
// 0부터 나오면 안되기 떄문에 99+1
let playerSel;
let count = 0;
let max = 100;
let min = 0;
let updown = "";
const maxCount = parseInt(prompt("몇번만에 맞출래?"));

do {
  playerSel = prompt(`${count}\n숫자를 선택해 주세요.
    컴퓨터가 선택한 숫자를 맞추시면 됩니다.\n최소 : ${min} / 최대 : ${max} / 남은 횟수 : ${
    maxCount - count
  }`);
  //prompt는 string, parseInt 정수형으로 바꿔줌으로 number
  //  playerSel에게 출력 코드를 사용해주지 않았기 때문에 출력이 안됨
  // 카운트를 플레이어가 입력했을 때 하나씩 증가시킨다.
  playerSel = parseInt(playerSel);
  if (min > playerSel || max < playerSel) {
    // 최소와 최대 사이에 값만 확인하기 위해 최소 미만과 최대 초과를 먼저 처리한다.
    console.log(" 제외된 숫자들이다.");
    // if문에서 설정됐으니 뒤에 else if로 예외 처리하는 것이다.
  } else if (playerSel == comSel) {
    console.log(`${count}"정답입니다, 축하해요`);
    // `${count}` >> 몇번만에 맞췄는지
    // console.log(`${++count}"정답입니다, 축하해요`);
    // ++count ->  ++ 을 한 상태에서 추가 (한번 문장 안에서 카운트가 추가되어야 하기 때문에)
    break;
  } else if (playerSel > comSel) {
    // 플레이어가 선택한 숫자가 컴퓨터가 선택한 숫자보다 크다.
    max = playerSel;
    // max가 현재 플레이어가 선택한 숫자가 된다.
    console.log("UP!");
    updown = "UP";
    count++;
    // 정상적인 숫자를 입력했을 때만 카운트를 늘리도록 UP, DOWN일 때 카운트를 추가한다.
  } else if (playerSel < comSel) {
    min = playerSel;
    console.log("DOWN!");
    updown = "DOWN";
    count++;
    // 정상적인 숫자를 입력했을 때만 카운트를 늘리도록 UP, DOWN일 때 카운트를 추가한다.
  } else {
    console.log("숫자만! 입력해라");
    updown = "숫자만! 입력해라";
    count++;
  }
} while (playerSel !== comSel && count < maxCount);
if (count >= maxCount) {
  console.log("제한 횟수를 초과하셨네요");
}
// 컴퓨터가 숫자 선택 후 플레이어가 선택하는 것은 계속 반복되어야 한다.
// 입력한 순간부터 반복되어야 하기 떄문에 일단, 맞는지부터 확인 후 체크
// 언제까지 플레이어가 컴퓨터의 숫자를 맞출때까지
