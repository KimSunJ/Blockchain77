const fs = require("fs");
// file system 의 약자 / 객체

const fsProm = fs.promises;

fsProm
  .readFile("./test.txt")
  // read 파일을 불러온다.
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });
