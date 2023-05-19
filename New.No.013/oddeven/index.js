// 기존의 odd, even 클릭과 달리 oddeven에서 호출 받으며 전달받은 매개변수를 사용하기 위해 count를 매개변수로 선언한다
// 괄호 안의 count << string(문자열) '123'
function odd(count) {
  // const count = parseIng(prompt("몇까지ㅈ 찍을까?"));
  // odd 클릭 시 count는 입력된 값이 없기 때문에 indefined가 된다.
  // oddeven 함수에서 호출 받았을 시에는 count에 oddeven 함수에서 전달한 매개변수가 count에 정의된다.
  // << '123' -> true 이기 때문에 기존에 입력값을 사용해야하기에 다시 사용하면 안된다.
  if (!count) count = parseInt(prompt("몇까지 찍을까"));
  //   undefined는 boolean 값으로 따졌을 때 false 되기 때문에 매개변수가 없는지 확인하여 입력 받을 수 있도록 처리한다.
  count = parseInt(count);
  // 입력값을 parseInt로 받아준다.
  // oddeven 함수에서 전달받은 count는 문자열 (string)이기 때문에 parseInt 함수를 호출하여 정수로 변환해준다.
  for (let i = 0; i <= count; i++) {
    if (i % 2) console.log(i);
    // console.log("i : ", i);

    // 나머지를 많이 사용 / 8진수 16진수
    // i % 2 << 홀수 일때 1 이 나오고 짝수일때 0이 나옴
    // -> 홀수를 판단 할 수 있다. (1 = true / 0 = false)
    // Math.random()만 사용시 아무 숫자나 곱해버리기 때문에 소수점이 나온다 나머지를 사용하기도 함
  }
  //   console.log("끝");
  //위 코드는 아래 코드들보다 안좋다.
  // 위 코드는 예를 들어 10을 넣었을 시 10번을 반복한다.
  // 아래 코드들은 마찬가지의 예로 10을 넣었을 시 5번을 반복한다.
  // 반복의 회수 차이가 입력된 수에 대해서 기하급수적으로 늘어날 수 있다.

  // --------------- < > --------------------
  //   for (
  // let i = 0;
  // i < count / 2;
  // i++ i <ount / 2;
  //   ) {
  // console.log(i * 2 + 1);
  // console.log("i : ", i);
}
//   console.log("끝");

//  우리가 뽑아낸 홀수가 작은지를 조건으로 봄

//   for (let i = 1; i < count + 1; i += 2) {
// console.log("i : ", i);
// console.log(i);
//   }
//   console.log("끝");
// }
const even = function (count) {
  if (!count) count = prompt("몇까지 찍을까");
  for (let i = 0; i <= count; i++) {
    if (!(1 % 2)) console.log(i);
    // i % 2 << 짝수일 때 0 >> 0 false기 때문에 부정을 해준다.
  }

  //   for (let i = 0; i < (count + 1) / 2; i++) {
  // console.log(i * 2);
  //   }
  //   for (let i = 0; i < count + 1; i += 2) {
  // console.log(i);
  //   }
};

const oddeven = () => {
  const count = prompt("몇까지 찍을까? 그리고 홀이야? 짝이야?\n형식은 n&홀짝");
  // 홀인지 짝인지 구분할 것이기에 parseInt 삭제
  // '123&홀 형식의 문자열(string) 받게 된다.
  // split 메서드를 호출해서 &를 기준으로 분리한다.
  // 문자열(string) 아이템을 가진 배열을 반환 (리턴)받는다. >>count.split("&")
  // -> ['123' , '홀'] >> &를 기준으로 자른다.
  const number = count.split("&")[0]; // << '123'
  const isodd = count.split("&")[1]; // << '홀'
  // 숫자와 홀짝이 나누어졌다.

  if (isodd == "홀") {
    // isodd가 홀인지 확인하여 홀이면 odd 함수를 호출한다.
    // 함수를 호출하면서 받았던 숫자(number)를 매개변수로 전달한다.
    odd(number);
    // 매개변수로 입력된 숫자를 전달한다.
  } else {
    even(number);
  }
};
