// npm => node package manager
//  Node.js에서 사용하는 라이브러리 관리자
//  yarn(React)도 사용 가능

// npm install 라이브러리명 = npm i 라이브러리명
// 라이브러리 설치
// package.json : Node.js를 사용해 구현된 프로그램(모듈, 라이브러리, ...)에 대한 정보를 모아둔 파일
//
// dependencies는 의존성을 뜻하며, 현재 프로그램이 실행되기 위해서 필요한 라이브러리이다.

const express = require("express");
// require는 외부 라이브러리를 가져오는 함수
// 매개변수로 라이브러리명을 전달한다.

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  res.send("hi");
  // send는 return과 같은 역할을 하기에 밑에 같은 명령어를 사용하면 오류가 생긴다.
  // req : 요청 사항, 요청에 대한 데이터
  // res : 응답 사항, 응답의 데이터
});

app.listen(8080, () => {
  // 어떤 포트를 사용하여 서버를 열것인지
  console.log("서버 열음");
});
// 서버 연 상태(npm start;)에서 localhost:8080으로 서버를 연다.
