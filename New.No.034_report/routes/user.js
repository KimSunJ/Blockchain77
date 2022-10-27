const router = require("express").Router();
const crypto = require("crypto-js");
// const jwt = require("jsonwebtoken");
const userlist = [];
const loglist = [];

router.post("/regist", (req, res) => {
  if (!userlist.length) {
    userlist.push({
      id: req.body.id,
      pw: crypto.SHA256(req.body.pw).toString(),
      name: req.body.name,
    });
    // console.log(req.body.name);
    res.send({ status: 200, data: "regist" });
  } else {
    res.send({ status: 402, data: "exist id" });
  }
});

router.post("/login", (req, res) => {
  console.log(userlist[0].id);
  let bool = false;
  if (
    userlist[0].id == req.body.id &&
    userlist[0].pw == crypto.SHA256(req.body.pw).toString()
  ) {
    bool = true;
    // console.log(userlist[0].name);
    loglist.push({
      id: req.body.id,
      pw: crypto.SHA256(req.body.pw).toString(),
      name: userlist[0].name,
    });
    // console.log(loglist[0].name);
    res.send({ bool: bool, data: req.body.id, data2: loglist[0].name });
  } else {
    res.send({ status: 402, data: "exist id", log: bool });
  }
});

// router.post("/login", (req, res) => {
//   console.log(req.cookies.cookie_name);
//   if (loglist[req.body.id]?.pw === crypto.SHA256(req.body.pw).toString()) {
//     res.cookie(
//       "log_jwt",
//       jwt.sign({ name: loglist[req.body.id].name }, "block7testing", {
//         algorithm: "HS256",
//         expiresIn: "1m",
//         issuer: "jsh",
//       })
//     );
//     res.send({ status: 200, data: "login", loglist });
//   } else {
//     res.send({ status: 401, data: "wrong password", loglist });
//   }
// });

module.exports = router;
