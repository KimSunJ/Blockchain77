import { Router } from "express";

const router = Router();
const todoList = [];

router
  .route("/list")
  // /api/list + '/' -> /api/list/ 만들려고 함.
  .get((req, res) => {
    res.send({
      list: todoList,
    });
  })
  .post((req, res) => {
    todoList.push({ text: req.body["name"], time: req.body.time });
    res.end();
  })
  .put((req, res) => {
    // 수정;
  })
  .delete((req, res) => {
    // 삭제;
  });
// 라우트가 같을 때 get이냐 post인지 나누는 코드
export default router;
// module.exports = router
