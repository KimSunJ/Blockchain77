const str = "abcDeFgHIJklmn";

console.log(str.indexOf("D"));
// 매개변수로 전달된 텍스트가 어디있나? << 시작 위치를 찾는다.
console.log(str.indexOf("cD"));
console.log(str.indexOf("cDY"));
// 전달된 텍스트가 내용에 있을 시 -1을 리턴(반환)한다.
console.log(str.length); // 길이

console.log(str.slice(1, 3));
// 0 a 1 b 2 c 3 D 4 e 5 F 6 g 7 H 8 I 9 J 10 k 11 l 12 m 13 n 14
// 자르기, 1에서 시작해서 3에서 끝난다. >> b, c 출력

console.log(str.split(/D/));
// D가 칸막이 역할을 하여 D를 기준으로 배열을 나눈다.
// 매개변수로 전달된 정규표현식(어렵다?)을 기준으로 자른다.

console.log(str.split("")); //하나하나 다 분해한다.

console.log(str.replace(/D/, " "));
// 1번째 매개변수로 정규표현식을 전달하고, 두번째 매개변수로 바꾸고 싶은 텍스트를 전달한다.
// "띄어쓰기" 도 가능하다.

console.log(str.toLowerCase()); // 전부 소문자로
console.log(str.toUpperCase()); // 전부 대문자로

console.log(str.charAt(1)); // 해당 위치의 아이템을 찾아준다.

// 정규표현식
// \d : 숫자
// [^] : 부정
