const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};
// {asdf: '2134'}

// jwt를 사용하여 로그인 확인
//   - 웹 페이지 상에서 jwt의 데이터를 사용하여 사용자 출력

router.post("/regist", (req, res) => {
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = {
      name: req.body.name,
      pw: crypto.SHA256(req.body.pw).toString(),
    };
    res.send({ status: 200, data: "regist" });
  } else {
    res.send({ status: 402, data: "exist id" });
  }
});

router.post("/login", (req, res) => {
  console.log(req.cookies.cookie_name);
  if (userlist[req.body.id]?.pw === crypto.SHA256(req.body.pw).toString()) {
    res.cookie(
      "log_jwt",
      jwt.sign({ name: userlist[req.body.id].name }, "block7testing", {
        algorithm: "HS256",
        expiresIn: "10m",
        issuer: "jkh",
      })
    );
    res.send({ status: 200, data: "login" });
  } else {
    res.send({ status: 401, data: "wrong password" });
  }
});

module.exports = router;
