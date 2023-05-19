const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const db = require("./models/index.js");
const routes = require("./routes/index.js");

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
    name: "seed",
  })
);

db.sequelize
  .sync({ force: false })
  // true : 테이블을 삭제하고 다시 만듦 / false: 테이블을 갖고와서 쓴다.(table이 없을 때 가져다 쓴다.)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/hi", routes);
// localhost:8080/hi >> routes에 접근한다.
// routes는 변수다 (선언을 해준 것대로 적으면 된다.)
// localhost:8080/hi/routes << 아니다

app.listen(app.get("port"), () => {
  console.log(app.get("port") + "server open");
});
