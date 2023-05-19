// 암호화 -> 이론만 간단한 용어
// 입력한 데이터를 다른 사람이 알 수 없도록 변환한다.
// 1234 => 암호화를 통해서 => 알수 없는 숫자나 문자로 만든다.
// 복호화 : 암호화된 데이터를 원상 복구한다.
// 알수 없는 숫자나 문자열을 복호화하면 원래 암호 숫자를 볼 수 있다.
// 사용자가 입력한 데이터를 알 수 있어야 하는가?
// 개인 정보 포함 알면 안되는 것들도 있다. -> 단방향 / 양방향 암호화
// 즉, 단방향은 암호화만 가능하다. -> 복호화가 불가능하다.
// 10/24
// 단방향
// 단방향은 복호화가 불가능하다.
// Hashing : 일종의 배열, 객체
//  암호화된 중복되지 않는 키를 사용하여 데이터를 저장한다.
//  배열이 [0, 1, 2, 3, 4, 5] (ex_키에 대한 데이터)에 따라 일정한 데이터가 있는 것 (원하는 위치값)
//  -> [esd, sdld, erwe, werw, iudf](입력된 데이터) / 단, 중복이 최대한 되지 말아야 한다.
//      종류 >> SHA256(가장 많이 사용됨), RIPEMD160 등이 있다.
//  일정한 데이터를 변환하여 저장한다.
// 양방향
// 양방향은 복호화가 가능하다.
//  양방향 : 대칭키, 비대칭키
//  대칭키 : 암호화와 복호화가 같은 키로 변환된다. -> 키가 하나
//      종류 >> AES, DES, SEED
//  비대칭키 : 암호화와 복호화가 다른 키로 변환된다. -> 퍼블릭, 프라이빗 키로 나뉜다.
//      종류 >> RSA, ECC >> 이 두종류를 테스트하기 위해선 openSsl 등을 사용해야한다.

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
// 10.24
// require("./api/cryptoTest.js");
// = import "./api/cryptoTest.js"
// require("./api/jwt.js");
// require("./api/javascript.js");
const routes = require("./routes/index.js");
// const { route } = require("./routes/index.js");

const boardList = [
  { title: "arvserv1", text: "9baresrsearvstb" },
  { title: "arvserv2", text: "8baresrsearvstb" },
  { title: "arvserv3", text: "7baresrsearvstb" },
  { title: "arvserv4", text: "6baresrsearvstb" },
  { title: "arvserv5", text: "5baresrsearvstb" },
  { title: "arvserv6", text: "4baresrsearvstb" },
  { title: "arvserv7", text: "3baresrsearvstb" },
  { title: "arvserv8", text: "2baresrsearvstb" },
  { title: "arvserv9", text: "1baresrsearvstb" },
];

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "web")));
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

// app.use("/", (req, res, next) => {
// "/"니까 루트를 찾는다.
// console.log("url1 : " + req.url);
// next();
// });

// app.use("/api", (req, res, next) => {
// 이미 api에는 접근했고 남은 url이 /board다
// console.log("url2 : " + req.url);
// next();
// });

// api 라우트에 연결

// [오후 수업]
app.post("/api/board/add", (req, res) => {
  boardList.unshift(req.body);
  res.send({ status: 200, data: "정상 입력 완료" });
});

app.post("/api/board/delete", (req, res) => {
  console.log(req.body);
  boardList.splice(+req.body.count * 5 + +req.body.num, 1);
  res.send({ status: 200, data: "delete 테스트중" });
});

app.post("/api/board/update", (req, res) => {
  boardList[+req.body.count * 5 + +req.body.num].text = req.body.text;
  boardList[+req.body.count * 5 + +req.body.num].uptime = req.body.time;
  res.send({ status: 200, data: "update 테스트중" });
});

app.get("/api/board", (req, res) => {
  res.send({
    status: 200,
    list: boardList.slice(+req.query.count * 5, (+req.query.count + 1) * 5), //0~5 => 5~10
    maxCount:
      parseInt(
        (boardList.length ? boardList.length - 1 : boardList.length) / 5
      ) + 1,
    // 조건? 참: 거짓
  });
});

app.use("/api", routes);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
