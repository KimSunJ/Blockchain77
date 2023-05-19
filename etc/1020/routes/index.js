import { Router } from "express";

const router = Router();
const textList = [];

router
  .route("/list")
  .get((req, res) => {
    res.send({
      list: textList,
    });
  })
  .post((req, res) => {
    textList.push({ name: req.body.name, text: req.body.text });
    res.end();
  });
// .put((req, res) => {})
// .delete((req, res) => {});
export default router;
