// JWT : JsonWebToken
// session이 종료되었습니다.
// JSON은 일종의 데이터 형식
// 데이터가 string 으로 객체 이루어져 있고, 배열도 사용 가능한다. 객체로 파싱하여 사용
// forms['dataName'] == forms.dataName >> 변수값으로 받고 싶을때 사용
// forms?.['dataName'] == forms?.dataName
//   JWT : 웹에서 사용하는 JSON 형식의 토큰 (짧은 데이터)
const crypto = require("crypto-js");

const tempHeader = JSON.stringify({ name: "block7", alg: "HS256" });
// parse JSON 형식을 객체로 변환
// stringify : 객체를 JSON 형식으로 변환
// alg : 어떠한 알고리즘을 사용할 것인가.
// HS256(default), HS384, HS512, RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512
const base64Header = Buffer.from(tempHeader).toString("base64url");
// JWT는 base64url 형식의 포맷을 사용한다.
//   base64가 뭘까?
//   데이터의 포맷 중 하나로, ASCII 코드를 기준으로 데이터를 저장하는 포맷이다.
const JWTHeader = base64Header.replaceAll("=", "");
// 위는 header를 완성했다.

const tempPayload = JSON.stringify({ maker: "tester", expiresIn: "10m" });
// expiresIn : 10m >> 10분이 로그인 암호화 인증 종료 시점 / 로그인 후 조작이 없을 경우 10분 유지 후 자동 로그아웃 / 로그인 후 조작하고 있으면 웹 토큰을 보내주면서 계속 유지되는 것
// 쿠키에 저장되어 있거나 session과 함께 저장되는 것.
const base64Payload = Buffer.from(tempPayload).toString("base64url");
const JWTPayload = base64Payload.replaceAll("=", "");
// 위는 payload를 완성했다.

const tempSignature = crypto
  .HmacSHA256(JWTHeader + "." + JWTPayload, "key")
  // 알고리즘(alg와 맞춰야함)
  .toString(crypto.enc.Base64url)
  .replaceAll("=", "");
// JSON 웹 토큰때문에 "="을 없애는 것

const jwt = `${JWTHeader}.${JWTPayload}.${tempSignature}`;
console.log(jwt);
// JSON Web Token은 'header.payload.signature'로 이루어져 있다.
// header : JWT의 검증을 위한 데이터가 저장된다.
// payload(내용) : JWT가 갖고 있는 데이터이다. << 우리가 저장하고 싶은 데이터, 주고 받아야 할 데이터 ,로그인 후의 그 사람의 닉네임, 어떠한 암호화된 토큰 등이 될 수도 있다.
// Signature : 암호화된 서명이다 >> 검증에 사용한다.
