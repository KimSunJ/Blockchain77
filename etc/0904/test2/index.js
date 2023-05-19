const tempArr = [
  { name: "김선주", age: 33, area: "대치동" },
  { name: "이가원", age: 20, area: "수원" },
  { name: "고우석", age: 28, area: "성남" },
];
// if를 제외하고는 ;를 적어줘야 한다 (끝나는 것)
console.log(tempArr.find((item) => item.area === "성남"));
console.log(tempArr.findIndex((item) => item.area === "수원"));
console.log(tempArr.filter((item) => item.area === "대치동"));
console.log(tempArr.map((item) => item.area === "성남"));
// 수정하며 내용을 확인해 보길...
