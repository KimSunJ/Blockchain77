"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const NewTable1 = require("./table1.js");

const db = { NewTable1 };

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

NewTable1.init(sequelize);
// table 설정 어떻게 했냐 불러옴
NewTable1.associate(db);

module.exports = db;
