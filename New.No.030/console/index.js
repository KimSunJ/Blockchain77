// ES6 이전 << Javascript 버전
// Class가 대표적인 ES6, import export 등등이 있다.
console.log("로그 남기기");
// console = Javascript가 갖고 있는 객체 -> 내장 객체(메소드와 프로퍼티를 갖고 있는 객체)
console.log(global);
// global(브라우저의 window) => 전역 객체, js 파일에서 변수를 초기화하면 그 js 파일 내에서만 사용이 가능한데 전역으로 쓰고 싶으면 global의 프로퍼티로 추가해라
// 전역변수로 만듦 global을 사용함으로써
// Node.js에 DOM 있을까?
// HTML 파일의 구조를 저장한 객체 => DOM, document
// Node.js HTML 구조가 있나? 없다. 즉, document가 없다.
// window -> 브라우저의 정보를 갖고 있는 객체
// Node.js가 브라우저를 쓴다? 안쓴다.
// 즉, window 객체가 없다 => 이것을 대신하는 객체가 global이다.

console.warn("경고");
// 경고 출력
console.dir({ data: "구조 출력" });
console.log({ data: "구조 출력" });
// 구조에 대해서 출력
// 브라우저 쪽에서도 사용함
// <div> 어쩌구 저쩌구 </div> << console.log() [object]
// Element에 대한 정보, console.dir
console.time("시간 측정");
// 시간 확인? 출력?에 대한 시작점
console.timeLog("시간 측정");
// 시간 확인에 대한 중간점
console.timeEnd("시간 측정");
// 시간 확인 완료
// console.time을 기준으로 timeLog가 얼마나 걸리는지, timeEnd까지 얼마나 걸렸는지 볼 수 있음

console.assert(true, "참");
console.assert(false, "거짓");
// 거짓일때만 출력한다.

console.count("몇번?");
console.count("몇번?");
console.countReset("몇번?");
console.count("몇번?");

console.table({ name: "표", data: "출력" });

console.error("에러 출력");
// catch에서 console.error를 사용하는 경우가 많다.

// let a = 12;
global.a = 12;
// test.js와 연결 시켜주는 역할
// 브라우저에선 global이 없고, Node.js에서만 가능
// Node.js에서 맨 위에 있는 객체가 global
// 전역변수를 위해 사용하는 객체
