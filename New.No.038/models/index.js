"use strict";
// 엄격모드 : ES6 안됨, var 안되고, 빡세게 코드를 작성하겠다 / 제한을 두는 것

// DB의 Table에 관련해서 전부 관리한다.
// MVC << Model, View, Controller >> 프로그래밍 기초
// 디자인 패턴 중 하나로 보통의 프로그래밍에서 많이 사용된다.
// View : 보이는 것(프론트), Controller : 조작(서버), 통제하는 것, Model(DB) : 저장하는 것
// View 쪽에서 신호를 보내고 controller가 model에서 받아서 view쪽으로 다시 보낸다.
// models폴더 의의 : 테이블에서 작업을 해서 저장을 하기 때문에 필요하다.

const Sequelize = require("sequelize");
// sequelize : DB에 연결한다. => 무슨 DB든 다 가능하다. mySQL와 함께 사용하는 경우를 계속 하고있다. ex) MongoDB << noSQL(SQL이 없고, 관계 시스템이 없다)
// mysql2 : DB에 연결한다. => mySQL에 접근

const Table1 = require("./table1.js");
const Table2 = require("./table2.js");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = { Table1, Table2 };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Table1.init(sequelize);
Table2.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// class 상속 개념
// class A {
// constructor() {
// this.a = 1;
// }
// test(num) {
// console.log(num);
// }
// static testStatic(num) {
// static 함수 자체에서 사용하는 아이
// console.log(num);
// }
// }
// const testA = new A();
// testA.test(1);
// testA.testStatic(2) >> 작동 x
// A.test(1); >> 작동 x
// A.testStatic(4);
// console.log(new A());

// const tempDate = new Date();

// class B extends A {
//   constructor() {
//     super();
//     this.b = 2;
//   }
// }
// console.log(new B());
