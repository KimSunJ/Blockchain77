const router = require("express").Router();
// /api/board

router.get("/", (req, res) => {
  res.send(req.route + "get으로 받았다");
});

router.post("/add", (req, res) => {
  console.log(req.route);
  res.send(req.route + "post로 받았다");
});

module.exports = router;
