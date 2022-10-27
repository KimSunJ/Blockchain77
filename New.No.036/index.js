const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const db = require("./models/index.js");

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

db.sequelize
  .sync({ force: true }) // DB 서버와 연결한다, force는 설정된 테이블을 강제로 생성한다.
  // force : 우리가 express 서버에서 설정한 테이블 데이터와 실제 DB 서버의 테이블 데이터가 다르 경우에 서버의 테이블을 새로 생성하기 위해 사용한다.
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// 테이블에 데이터 추가 >> 계속 중복된 데이터가 들어가기 때문에 코드를 켜두면 터진다.
// db.NewTable1.create({
//   idx: "5",
//   name: "asdfasdf",
//   password: "asdfsadfasdf",
//   id: "asdf",
// });

db.NewTable1.findOne({
  where: { idx: 1 },
})
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

app.listen(app.get("port"), () => {
  console.log("http://localhost:8080");
});
