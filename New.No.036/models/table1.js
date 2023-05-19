const Sequelize = require("sequelize");
// Sequelize >> 라이브러리이다
// sequelize : db관련 연결해 주는 아이
// ===static이 없는 일반적 메서드
// const tempDate = new Date();
// tempDate.toLocalString();
// tempDate.getDay();
// ===static이 있는 메서드
// Date.now();
//

module.exports = class Table1 extends Sequelize.Model {
  //static => class를 new 하지 않고 메서드를 불러온다.
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          allowNull: false,
        },
        // type: Sequelize.INTEGER : INT , primaryKey: 고유 식별 키, autoIncrement: index 값 자동 증가 unique: 값이 중복되면 안된다. allowNull: 비면 안된다.
        // idx int PK
        name: { type: Sequelize.STRING(45), allowNull: true },
        id: { type: Sequelize.STRING(45), allowNull: true },
        pw: { type: Sequelize.STRING(45), allowNull: true },
        //  name varchar(45), allowNull: true >> 비워도 된다.
        //  assword: { type: Sequelize.STRING(256), allowNull: true },
        // password varchar(256)
        //  VARCHAR
        // id: { type: Sequelize.STRING(45), allowNull: true },
        //  id varchar(45)
        // create_at: {
        //   type: Sequelize.DATE,
        //   allowNull: true,
        //   defaultValue: Sequelize.NOW,
        // },
        // create_at date , defaultValue: Sequelize.NOW >> 기본값은 현재 시간
      },
      {
        sequelize, // 넣어라
        timestamps: true, // createAt, updateAt 자동으로 추가
        underscored: true, // 테이블과 컬럼명을 카멜 케이스로 수정
        modelName: "NewTable1", // Javascript에서 사용하는 테이블명
        tableName: "new_table1", // MySQL에 있는 테이블명
        paranoid: false, // 삭제 시 deleteAt을 저장할지, 테이블에서 데이터를 삭제 시 아예 삭제를 할 것인가? 아니면 삭제한 날짜를 남김으로써 데이터를 남길 것인가?
        charset: "utf8mb4", // 언어 포멧 설정
        collate: "utf8mb4_general_ci", // 언어 포멧 설정
      }
    );
  }

  static associate(db) {
    // 관계를 맺기 위함 댓글은 게시물의 다른 테이블에 저장된다.
    // db.NewTable1
  }
};
