const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const { runInNewContext } = require("vm");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
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

// http://localhost:8080/testing?lunch=asslkdjflsdkjf (ex_구글 검색창)
// http:// => 프로토콜
// localhost => 주소, IP 주소/ 도메인(DNS) 주소
// :8080 => 포트번호
// /testing => 라우터
// ?lunch=asslkdjflsdkjf => 대망의! 쿼리
// q=쿼리&
// rlz=1C5CHFA_enKR1021KR1021&oq=쿼리&
// aqs=chrome..69i57j0i512l9.1254j0j7&sourceid=chrome
// &기준으로 자름

// app.use("/testing", (req, res) => {
// app.get("/testing", (req, res) => {
app.post("/testing", (req, res) => {
  // 라우터만 확인
  // get으로 보내면 쿼리스트링형식으로 보내는 것이다.
  // 개인 정보가 아닌 사항을 get으로 보내도 된다.
  // post형식은 post 형식일때만 보낸다. / 개인 정보 비밀번호 같은 경우는 post 형식으로 보내야한다.
  console.log(req.body);
  //  console.log(req.query.lunch);
  //  req.query 와 req.body를 같이 사용하는 경우는 없다.
  //  req에 포함되어 있다.
  res.end(`<div>${req.query.lunch}</div>`);
  //  get 메서드 형식을 사용할때는 query, 즉 쿼리 스트링을 사용한다.
  //  post 메서드 형식을 사용할 때는 body로 데이터에 접근한다.
  //  use는 무조건 형식을 따지지 않고 실행하는 아이
});
// 언어 포맷이 다르기에 한글을 input에 적으면 꺠진다.
//

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(`포트 번호 ${app.get("port")}로 접속`);
});
