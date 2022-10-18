const fs = require("fs");
// fs도 또한 모듈이다. / 라이브러리
const path = require("path");

// console.log("dirname: " + path.dirname(__filename));
// 파일 이름을 제외한 파일 경로
// console.log("extname: " + path.extname(__filename));
// 파일의 확장자
// console.log("basename: " + path.basename(__filename));
// 파일의 이름(확장자 포함)
// console.log(path.join(__dirname, "..", ".."));
// ".." -> 이전 경로 / 경로를 합친다.
// console.log(path.join(__dirname, "..", "..", "New.No.001"));
// path란 경로에 대해서 관리하는 모듈이다.
// 모듈이라고 한 이유 불러와야지 가져와야지 사용 가능하기 때문

// fs.writeFile("./test.txt", "안녕하세요", (data) => {
//   console.log(data);
// });
// 파일을 생성한다. "파일명", "파일 내용"

// fs.readFile("./test.txt", (err, data) => {
//   if (err) console.log(err);
// 없으면 에러
//   console.log(data);
//   console.log(data.toString());
// });

// const fsProm = fs.promises;

// fsProm
//   .writeFile("./test1.txt", "프라미스~")
//   .then(() => {
// return fsProm.readFile("./test1.txt");
//   })
//   .then((data) => {
// console.log(data);
// console.log(data.toString());
//   })
//   .catch((err) => {
// console.log(err);
//   });
//
// fs.writeFileSync("./test2.txt", "싱크 확인");
function tryTest() {
  try {
    let data = fs.readFileSync("./test11.txt");
    // 없는 파일을 가져올때 에러가 뜸
    console.log("data: " + data);
  } catch (err) {
    console.error("err: " + err);
  }
}

tryTest();

let data = fs.readFileSync("./test.txt");
console.log("data: " + data);
data = fs.readFileSync("./test1.txt");
// 동기작업을 하겠다
console.log("data: " + data);
data = fs.readFileSync("./test2.txt");
console.log("data: " + data.toString());

async function readFileSyncFunc(filePath) {
  const data = await fs.promises.readFile(filePath);
  // 파일을 받아와서 받아줄때까지 기다린다.
  console.log("test: " + data);
}

// fs.createReadStream()
// 파일을 받아올때 컴퓨터가 과부하가 걸리지 않게 필요한 만큼 끊어서 보낸다. sync를 사용했을 경우

console.log(__filename);
// 파일 이름을 포함한 경로
console.log(__dirname);
// 현재 파일 경로
// 위 변수들은 ES6에 없다.

// import fs from "fs";
// ES6 문법이다.
