const router = require("express").Router();
// const board = require("./board.js");
const user = require("./user.js");
router.use("/", (req, res, next) => {
  console.log("routes/index.js : " + req.url);
  next();
});

// router.use("/board", board);
router.use("/user", user);

module.exports = router;
