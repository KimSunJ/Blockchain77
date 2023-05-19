const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};
// 회원가입 정보
// ex_{asdf: '2134'}

router.post("/regist", (req, res) => {
  // const tempJWT = jwt.sign({ name: "test" }, "sdfsdfsdf", {
  //   algorithm: "HS256",
  //   expiresIn: "10m",
  //   issuer: "jsj",
  // }); // jwt 생성
  // console.log(tempJWT);
  // const tempData = jwt.verify(tempJWT, "sdfsdfsdf"); // jwt 파싱
  // console.log(tempData);
  // 쿠키는 임시 데이터를 브라우저에 저장한다.
  // 크롬에서 로그인한 것, 쿠키에 남아있겠지? >> 파이어폭스에서 연동될까?
  // 안된다... << 데이터 저장 공간이 다르기 때문이다. 즉, 쿠키 저장한 파일이 다르다. 데이터는 브라우저에 저장되는데 브라우저가 다르기 때문
  // const cookie_name = "cookie_name",
  //   cookie_data = "now testing";
  // 변수에 저장하여 사용도 가능하다.
  // res.cookie(cookie_name, cookie_data, {
  // res.cookie("cookie_name", "now testing", {
  // expires: new Date(Date.now() + 30 * 1000),
  // 단위가 ms다, 1ms = 0.001s => 1000ms = 1s

  // 10 * 60 * 1000 << 1000 => 1s * 60 => 1m * 10 => 10분
  // 30초로 수정
  // });
  // 쿠키 추가 쿠키와 세션은 시간이 지나면 사라진다. / 쿠키는 애초에 시간을 주는 것이 규칙
  // 응답으로 쿠키 추가
  // console.log(req.body);
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = {
      name: req.body.name,
      pw: crypto.SHA256(req.body.pw).toString(),
    };
    // userlist[req.body.id] = { pw:req.body.pw, name:req.body.name, };
    // userlist{'asdf'} = '2134'
    res.send({ status: 200, data: "regist", userlist });
  } else {
    res.send({ status: 402, data: "exist id", userlist });
  }
});

router.post("/login", (req, res) => {
  console.log(req.cookies.cookie_name);
  // 요청을 통해 받은 쿠키
  if (userlist[req.body.id]?.pw === crypto.SHA256(req.body.pw).toString()) {
    res.cookie(
      "log_jwt",
      jwt.sign({ name: userlist[req.body.id].name }, "block7testing", {
        algorithm: "HS256",
        expiresIn: "10m",
        issuer: "jsh",
      })
    );
    res.send({ status: 200, data: "login", userlist });
  } else {
    res.send({ status: 401, data: "wrong password", userlist });
  }
});

module.exports = router;
