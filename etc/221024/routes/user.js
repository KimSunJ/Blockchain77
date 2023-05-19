const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};

router.post("/regist", (req, res) => {
  const tempJWT = jwt.sign({ name: "test" }, "sdfsdfsdf", {
    algorithm: "HS256",
    expiresIn: "10m",
    issuer: "jsj",
  });
  console.log(tempJWT);
  const tempData = jwt.verify(tempJWT, "sdfsdfsdf");
  console.log(tempData);

  //   const cookie_name = "cookie_name",
  // cookie_data = "now testing";

  //   res.cookie(cookie_name, cookie_data, {
  //     expires: new Date(Date.now() + 30 * 1000),
  //   });
  console.log(req.body);
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = crypto.SHA256(req.body.pw).toString();
    res.send({ status: 200, data: "regist", userlist });
  } else {
    res.send({ status: 402, data: "exist id", userlist });
  }
});

router.post("/login", (req, res) => {
  console.log(req.cookies.cookie_name);
  if (userlist[req.body.id] === crypto.SHA256(req.body.pw).toString()) {
    res.send({ status: 200, data: "login", userlist });
  } else {
    res.send({ status: 401, data: "wrong password", userlist });
  }
});

module.exports = router;
