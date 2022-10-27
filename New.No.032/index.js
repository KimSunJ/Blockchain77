import express from "express";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
// url => 주소, 라우터?, 서버내에서의 파일 위치 등등, 관리하는 내장 모듈

import listApi from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const todoList = [];

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/api", express.static(path.join(__dirname, "public")));
app.use(express.json());
// {"list":[]} -> json 형태는 객체와 똑같고, "list" 모든 것을 string 처리를 한다.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);
app.use(cors());

app.use("/api", listApi);

// app.get("/api/list", (req, res) => {
// get으로 요청을 했을 때
// res.send({
// list: todoList,
// });
// });

// app.get("/api/add", (req, res) => {
// console.log(req.query);
// todoList.push(req.query["name"]);
// const { str } = req.query;
// console.log(str);
// console.log(todoList);
// res.end();
// });

// app.post("/api/add", (req, res) => {
// post 형식으로 요청을 받을 때
// (첫번째 매개변수와 두번째 매개변수를 받고)
// 첫번째 매개변수는 라우터, 즉 주소의 뒤에 어떻게 붙어서 요청이 들어왔는가?
// localhost:8080/api/add -> 라고 들어왔을 경우
// 두번째 매개변수는 콜백 함수이며, 해당 post 요청에 대해서 실행하는 작업 코드 내용
// console.log(req.body);
// 받은 데이터를 넣어준다.
// todoList.push({ text: req.body["name"], time: req.body.time });
// req, 즉 요청에 body 안에 있는 do-name을 todoList에 추가한다.
// 만약 get으로 받았다면 query를 사용
// -를 사용했기 때문에 배열에 담아 ""를 사용한 것
//   const { str } = req.body;
//   console.log(str);
//   console.log(req.body.time);
// console.log(todoList);
// res.end();
// res, 즉 응답으로 todoList를 보내고 완료한다.
// });

app.listen(app.get("port"), () => {
  // 데이터를 넣어준다.
  console.log("open");
});

// Web Server
//  HTTP 통신을 한다. <- 요청과 응답
//  브라우저가 요청을 하고 보낸다. -> 그 요청을 서버가 받는다. -> 그리고 서버는 요청에 대해서 응답을 보낸다. -> 브라우저가 자신이 보낸 요청에 대한 응답을 받는다.
//  클라이언트가 요청을 보내야만 서버가 데이터를 응답으로 보내줄 수가 있다.
//  클라이언트(브라우저)는 서버를 어떻게 찾을까?
//  IP / DNS 주소를 찾는다. -> 서버에 접속한다. -> 정상적인 포트로 접근했는가, 접속이 허용된 포트인가를 서버가 확인한다.
//  접속이 되었을 때 서버는 응답한다.
//  어떻게 응답할까? -> URL, 우리가 기존에 생각했던, 알고있던 주소와 지금 얘기하는 주소가 다르다는 걸 알아야한다.
//  우리가 기존에 알던 주소는 "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%E3%85%81%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9"
//  서버에서 말하는 주소는 search.naver.com -> 도메인 주소를 말한다.
//  라우터 : search.naver
//  쿼리 스트링 : ?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%E3%85%81%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9
//  우편번호 : 건물마다 지정되어져 있고, 그걸 주소라고 한다.
//  정확한 위치를 위해 상세 주소를 적는데, 이와 같이 서버내에서 위치 찾는 것을 라우터라고 할 수 있다.
//  도서관 << 주소
//  도서관의 인문학관, 자연학관, 철학관 등등 << 라우터
//  각 관의 책들은 << 데이터
//  그 책들에 붙어있는 라벨들을 찾아서 대여한다 << 응답
//
