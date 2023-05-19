const today = new Date();

console.log(today);

console.log(today.toLocaleString());
console.log(today.toUTCString());

console.log(today.getDate());
console.log(today.getDay());
// 일요일부터 0으로 시작하여 요일을 0~6(일~토)로 출력합니다.

console.log(today.getMonth());
// 날짜 관련이다 => Date 기억하기
console.log(Date.now());
console.log(new Date(Date.now()));
