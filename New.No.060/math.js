// 진수 구하기, 과제
// 10(DEC)진수를 2진수(BIN)로
// 16진수를 10진수로
// 2진수를 10진수로
// Hex : 16진수 Hexadecimal => 암호화때 나오는 수
// Dex : 10진수 Decimal
// Oct : 8진수 Octal
// Bin : 2진수 Binary => 컴퓨터가 사용하는 수 bit < byte == 8bit

function pow(x, n) {
  // x를 n승으로 제곱
  let value = 1;
  for (let i = 0; i < n; i++) {
    value *= x;
  }
  return value;
}

function changeInt(number) {
  // 숫자의 소수점을 버리기 위해서
  let str = `${number}`;
  let value = 0;
  for (let i = 0; i < str.length; ++i) {
    let tempNumber = +str[i];
    if (tempNumber > -1 && tempNumber < 10) {
      value *= 10;
      value += tempNumber;
    } else {
      // NaN이 나왔다. 즉, 숫자가 아니다.
      break;
    }
  }
  return value;
}

function dec2Hex(dec) {
  // 10(DEC)진수를 16진수(HEX)로
  let value = "";
  while (dec) {
    switch (dec % 16) {
      // 10진수를 16으로 나눠서 그 나머지를 사용한다.
      // 0~15까지 사용한다. 0~9까지는 그대로 사용한다.
      // 10~15까지는 한자리로 나타내야 하기 때문에 영어의 A~F까지를 사용하게 된다.
      // 10~15까지 처리한다.
      case 10:
        value = "A" + value;
        break;
      case 11:
        value = "B" + value;
        break;
      case 12:
        value = "C" + value;
        break;
      case 13:
        value = "D" + value;
        break;
      case 14:
        value = "E" + value;
        break;
      case 15:
        value = "F" + value;
        break;
      default:
        // 0~9까지를 처리한다.
        value = (dec % 16) + value;
        break;
    }
    dec = parseInt(dec / 16);
    // dec = +`${dec / 16}`.split(".")[0];
    // dec = Math.floor(dec / 16);
  }
  return value;
}

function hex2dec(hex) {
  // 보통 프로그래밍 상에서 Hex, 즉 16진수는 string(문자열, 문장)으로 저장된다.
  let value = 0; // 10진수 저장할 변수
  for (let i = 0; i < hex.length; ++i) {
    let temp = 0;
    switch (hex[i]) {
      case "A":
        temp = 10;
        break;
      case "B":
        temp = 11;
        break;
      case "C":
        temp = 12;
        break;
      case "D":
        temp = 13;
        break;
      case "E":
        temp = 14;
        break;
      case "F":
        temp = 15;
        break;
      default:
        temp = +hex[i];
        break;
    }
    // '123' => 첫 자리를 할 때
    // 1 <= temp, 100의 자리 16의 제곱
    value += temp * 16 ** (hex.length - i - 1);
    // value += temp * pow(16, hex.length - i - 1);
    // hex == '123'
    // i == 0 / hex[i] == '1' / 1은 100의 자리 수이기 때문에 16의 제곱이다.
    // 10진수 바꿀 때 1에 16의 제곱을 곱해서 더해야한다.
    // i == 1 / hex[i] == '2' / 2는 10의 자리 수이기 때문에 16의 1승이다.
    // i == 2 / hex[i] == '3' / 2는 1의 자리 수이기 때문에 16의 0승이다.
    // 각 자리수에 대해서 16의 n승 곱해야한다. => 그 n을 구하는 방법은?
    // 각 자리수가 바뀔 때 함께 바귀는 것은 i다, i를 이용해야 한다.
    // i가 증가할 때마다 n은 감소한다.
    // 그 기준은 hex.length - 1이다.
    // hex를 기준으로 0의 자리부터 16 제곱을 생각하면 0, 1, 2, 3, 4, 5, ... 식으로 된다.
    // 4        5        6        8
    // 16의 3승  16의 2승  16의 1승  16의 0승(제곱)
  }
  return value;
}

function dec2bin(dec) {
  // 10진수를 2진수로 바꾼다.
  let value = "";
  while (dec) {
    value = (dec % 2) + value;
    dec = parseInt(dec / 2);
  }
  return value;
}

function bin2dec(bin) {
  // 2진수를 10진수로 바꾼다.
  let value = 0;
  for (let i = 0; i < bin.length; ++i) {
    value += +bin[i] * 2 ** (bin.length - 1 - i);
  }
  return value;
}

console.log(dec2Hex(4123));
console.log(hex2dec(dec2Hex(4123)));
console.log(dec2bin(4123));
console.log(bin2dec(dec2bin(4123)));
