// 라이브러리는 코드의 집합 (어떠한 기능에 대한 코드의 집합) - 외부 모듈을 라이브러리라고 부른다.
// 기존에 셋팅 되어 있는 것들을 말한다. 온라인상에서 공유를 하면 라이브러리이고 공유를 하지 않으면 모듈이다.
// npm : Node Package Module ( == 라이브러리)에서 설치한 모듈들은 node_modules에 있다.
// ========= 'html doc'와 비슷함 ===============
const express = require("express");
// 서버생성을 위한 라이브러리
// 라이브러리란 기능의 집합이다.
const session = require("express-session");
// 세션을 위한 라이브러리 << 세션은 나중에
// 쿠키를 보내려고 사용하는 세션
const morgan = require("morgan");
// 로그를 위한 라이브러리
const dotenv = require("dotenv");
// 환경 설정 파일을 로드하기 위한 라이브러리
const path = require("path");
// 경로 내장 모듈
const cookieParser = require("cookie-parser");
// 쿠키를 위한 라이브러리 << 세션과 같이 나중에

// console.log(require("./cusMath").sum(1, 2));

dotenv.config();
// 환경 설정 파일 로드

const app = express();
// 서버 생성
// app : 서버에 대한 정보를 갖고있는 객체
app.set("port", process.env.PORT || 8080);
// 서버 내의 프로퍼티 초기화
// process는 프로그램에 대한 정보를 갖고 있다.
// process.env는 환경 변수이다.
// console.log(app.get("port"));
// .env 파일에 PORT를 불러오면 포트를 사용하겠다는 의미

app.use((req, res, next) => {
  // use << 미들 웨어 등록
  // 서버에 접근하면 해당 코드가 실행된다.
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  // morgan을 사용할 때 combined는 배포용으로 사용된다.
  else morgan("dev")(req, res, next);
  // dev는 개발 모드로 사용된다.
});

app.use("/asdf", express.static(path.join(__dirname, "web")));
// "/" : 서버의 root, 즉 서버에 접근 시에 라우터가 없을 때
// 라우터란? (기계적 라우터: 통신 매개체) 서버 내의 폴더
// /IMG/***.jpg >> img 폴더에 ***.jpg를 가져온다는 뜻
// 서버의 하위 페이지를 구현할 때 사용한다.
// ******/router 식으로 표현한다.
// static은 전역, 기본적으로 연결할 폴더를 설정한다.
// __dirname 파일의 경로 / __dirname, "public" "web">> public(or web) 폴더로 연결한다.

app.use(express.json());
// 데이터를 주고 받을 때 json 형식을 사용한다.
// 안 넣으면 텍스트(string)방식으로 된다.

app.use(express.urlencoded({ extended: false }));
// querystring을 파싱할 때 사용한 방법을 설정
// false >> 모듈을 사용하지 않겠다.
app.use(cookieParser(process.env.COOKIE_SECRET));
// 쿠키 파싱(아래에서 암호화가 들어가 있어서)
app.use(
  session({
    // 세션 설정
    resave: false,
    // 요청마다 세션을 재설정할 것인가?
    saveUninitialized: false,
    // 요청에 대해 세션에 작업할 것인가?
    secret: process.env.COOKIE_SECRET,
    // 암호화 << 후에 자세히 다룰 예정
    cookie: {
      // 쿠키는 어떻게 저장할 것인가?
      httpOnly: true,
      // http에서만 사용한다.
      secure: false,
      // https인가?
    },
    name: "session-cookie",
    // 쿠키에서의 이름
  })
);

app.listen(app.get("port"), () => {
  // listen 서버를 시작한다.
  // 요청을 받기 시작한다.
  // port를 가지고 오고
  console.log("서버를 열었습니다.");
  // 콜백으로 어떤 실행을 할것인가를 넣어줌
});

// =================== 여기까지가 서버의 기본 설정 ======================================
// 어플리케이션 서버 - 데이터 주고 받는 서버
// 웹 서버 - html을 주고 받는 서버
// was 서버 - 웹 + 어플리케이션 서버

// 쿠키란?
//  쿠키 허락?= 사용자의 정보를 임시 저장하기 때문에 허락 여부를 묻는 것이다.(개인 정보이기에 법적으로 걸릴 수 있다.)
//  원래 cookie란 데이터를 임시 저장한 공간
//  데이터란 간단한 텍스트 << 이미지, 영상 등등은 포함하지 않는다.
//  쿠키 vs 캐시
//  쿠키는 텍스트로 저장된다.
//  cache(캐시) >> 이미지, 영상 등을 파일로 임시 저장하는 공간 / 텍스트는 파일로 임시 저장한다.
//  - 캐시는 파일로 저장된다. temp 폴더에 저장되어 있다.
//
// 세션이란?
//  쿠키랑 같은 기능을 한다. << 텍스트를 임시로 저장한다.
//  쿠키랑 세션이랑 나뉘어져 있는 이유 : 쿠키는 로컬에(브라우저에서 관리한다.), 세션은 로컬과 서버에 저장(서버쪽에서 관리한다.)
//  쿠키는 데이터이기에 용량이 참 << 쿠키를 비우면 상대적으로 브라우저가 빨라진다. (로컬에 저장 == 내 컴퓨터에 저장(RAM과는 다름))
//
// 미들웨어란?
//  프로그램 실행에 있어서 중간에 포함되는 작업 (실행되는 코드)

// const path = require("path");
// f12로 찾을 단어에 커서를 갖다대고 이전 것의 파일에 접근 가능하다. (선언된 곳으로 가기도 한다.)

// const cusMath = require("./cusMath");
// 외부 모듈을 가져올 때는 require를 사용한다.
// console.log(cusMath.sum(1, 2));
// console.log(cusMath.multiply(1, 2));
