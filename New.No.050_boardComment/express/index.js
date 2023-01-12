import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes/index.js";
// 파일을 가져오는 부분은 확장명까지 다 불러와야 한다.

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 8080);

// app.use(cors());
// 단, 현재로는 단점이 있다. (모든 주소에 대해서 응답해준다.)
app.use(cors({ origin: "http://localhost:3000" }));
// origin은 원본의 주소이며 해당 원본 주소에 대해서만 요청을 응답하겠다.
// 원본 주소에는 http와 같은 프로토콜, localhost와 같은 Domain 주소, :3000과 같은 포트까지 포함한다.
//  - '/api'와 같은 라우터는 포함하지 않는다.
// 우리가 사용하는 origin 주소에서만 cors 처리를 하겠다는 의미

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

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

app.use("/api", routes);
// /api router를 이용하여 routes(user)로 연결

app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 포트에 서버 오픈");
});

// CORS policy(정책)
// Cross Origin Resource Sharing
// 교차 원본 자원 공유 << 한국말
// 같은 주소가 아닌 다른 주소에서 API 요청 / 이미지 요청 등 자료를 구해올 수 없다. << 보안상의 문제
// GET에서는 발생하는 경우가 거의 없지만 POST 등에서는 거의 대부분 발생한다.
// 해결방안 : 보통은 proxy라는 개념을 사용한다.
// Proxy란? 중간 서버, 중간에서 다른 서버에 자료를 요청해서 자기것인것마냥 응답으로 보낸다. << 자세한 사항은 공부하기
// 다른 해결 방안 : (HTTP 통신 내의) Header에서 설정을 추가하여 웹페이지의 주소에 대해서 인증을 해준다.
// 제일 쉬운 해결 방안: Node.js에서는 cors라는 라이브러리가 있다.
//
