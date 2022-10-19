const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const { Cookie } = require("express-session");
const exp = require("constants");

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
// 보통 사용하는 미들웨어 방식 (use)
// 요청 사항들을 처리하는 방식 사이의 중간단계를 미들웨어라고 한다.
app.use((req, res, next) => {
  console.log(req.body);
  next();
  // next => 다음 것으로 넘어가라.(머물지 않음)
});

app.post("/*", (req, res, next) => {
  console.log("name : ", req.body.name);
  next();
});
// end가 없기 때문에 무한 로딩이 된다.

app.post("/api/user", (req, res) => {
  res.cookie("name : ", req.body.name);
  // 쿠키를 추가한다
  res.end("정보를 추가했다.");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log("localhost8080");
});
