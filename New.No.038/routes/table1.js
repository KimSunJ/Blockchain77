const router = require("express").Router();

const { Table1, Table2 } = require("../models/index.js");
// const Table1 = require("../models/index.js").Table1;

// 미들웨어 구간
// router.use는 메서드와 상관없이 모든 메서드를 확인한다.
router.get("/", (req, res, next) => {
  res.cookie("middle", "testing");
  next();
});
// 위 next()

router.get("/", async (req, res) => {
  const { body, query } = req; // 구조분해할당
  const options = {
    include: [
      {
        model: Table2,
        as: "Table2s",
      },
    ],
  };
  if (query.column2) {
    options.where = {
      // 어떤 조건으로 찾을것인가
      column2: query.column2, // column2가 query.column2인 애를 찾겠다.
    };
  }
  const tempTables = await Table1.findAll(options);
  // const tempTables = await Table1.findAll({
  // where:{
  // column2: query.column2
  // }
  // }); >> 이런 식으로 쉽게 적는 방법도 있다.
  // findAll() >> 자체가 primise 형식이다
  res.send({ name: "get", body, query, tempTables });
});

router.post("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table1.create({
    column1: body.column1,
  });
  res.send({ name: "post", body, query });
});

router.put("/", async (req, res) => {
  // 수정 시 전부 수정을 요청할 때
  const { body, query } = req;
  const tempTable = await Table1.update(
    {
      column1: body.column1,
      // 수정할 정보를 입력한다.
    },
    {
      where: {
        column2: body.column2,
      },
      // column2 body를 찾아서 column1의 body값을 바꾼다.
    }
  );
  res.send({ name: "put", body, query, tempTable });
});

router.patch("/", async (req, res) => {
  // 수정 시 일부분 수정을 요청할 때
  const { body, query } = req;
  res.send({ name: "patch", body, query });
});

router.delete("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table1.destroy({
    where: {
      column1: query.column1,
    },
  });
  res.send({ name: "delete", body, query, tempTable });
});

// router.use('/user') >> 제일 먼저 적는게 관례
// router.get('/')
// router.post('/user') >> use를 확인하고 확인
// router.put('/user')
// router.patch('/user')
// router.delete('/user')

// router
//   .route("/")
//   .get((req, res) => {
//     res.end();
//   })
//   .post((req, res) => {
//     res.end();
//   })
//   .put((req, res) => {
//     res.end();
//   })
//   .patch((req, res) => {
//     res.end();
//   })
//   .delete((req, res) => {
//     res.end();
//   });

// GET / POST / PUT / PATCH / DELETE
// 위 5가지 방식으로 통신을 하는 방식을 REST API라고 한다.
// REST API = RESTFUL API = RESTFUL
// HTTP 통신, 즉 Web 통신을 할 때 기본적으로 사용되는 방식이다.
// REST API vs GraphGL(이런 놈도 있음 / restapi를 강도화 시킨 것이라고 할 수 있다 잘 사용 안함)
//

module.exports = router;
