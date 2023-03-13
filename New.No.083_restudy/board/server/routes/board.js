const router = require("express").Router();

const { Board, User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const list = await Board.findAll(req.body);
    // db에 저장이 되지 않을 경우 isError가 뜸
    console.log(list);
    res.send({ isError: false, list });
    // res.end >> 끝냄
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/new", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { name: req.body.userName } });
    const board = await Board.create(req.body);
    await user.addBoard(board);
    // db에 저장이 되지 않을 경우 isError가 뜸
    res.send({ isError: false });
    // res.end >> 끝냄
  } catch (error) {
    res.send({ isError: true });
  }
});

module.exports = router;
