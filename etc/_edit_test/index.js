const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const boardList = [];

const app = express();
dotenv.config();

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

// app.use("/api", routes);

app.post("/api/board/add", (req, res) => {
  boardList.unshift(req.body);
  res.send({ status: 200, data: "정상 입력 완료" });
});

app.post("/api/board/update", (req, res) => {
  boardList[+req.body.count * 5 + +req.body.num].text = req.body.text;
  boardList[+req.body.count * 5 + +req.body.num].uptime = req.body.time;
  res.send({ status: 200, data: "update" });
});

app.get("/api/board", (req, res) => {
  res.send({
    status: 200,
    list: boardList.slice(+req.query.count * 5, (+req.query.count + 1) * 5), // 0~5 => 5~10
    maxCount:
      parseInt(
        (boardList.length ? boardList.length - 1 : boardList.length) / 5
      ) + 1,
  });
});

app.listen(8080, () => {
  console.log("가랏 수정몬");
});
