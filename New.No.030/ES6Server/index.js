// const express = require("express");
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import objTest, { minus as objMinus } from "./objtest/index.js";
// import objTest, { minus } from "./objtest/index.js";
import objTest from "./objtest/index.js";
// as는 앞에 export된 이름과 뒤레 여기서 쓸 이름을 정의한다.

console.log(objTest.multiply(1, 2));
// console.log(objMinus(1, 2));
// console.log(minus(1, 2));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
// app은 변수일 뿐이다. nodemon app과는 다름
app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "web")));
// __dirname이 es6문법에는 없다. 때문에 선언을 해줘야함

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
    name: "session-cookie",
  })
);

app.listen(app.get("port"), () => {
  console.log("서버 열기");
});
