const headList = [
  { type: "number", name: "번호" },
  { type: "name", name: "이름" },
  { type: "age", name: "나이" },
  { type: "area", name: "거주지" },
  { type: "mbti", name: "MBTI" },
  { type: "bloodType", name: "혈액형" },
];

const studentsList = [];

function creatStudent(name, age, area, mbti, bloodType) {
  studentsList.push({
    name,
    age,
    area,
    mbti,
    bloodType,
  });
}

creatStudent("김성진", 27, "성남", "INTP", "B");
creatStudent("염예나", 22, "하남", "ENFP", "B");
creatStudent("정재훈", 30, "강남", "ENTP", "B");
creatStudent("김재일", 29, "용인", "ENFP", "AB");
creatStudent("이가원", 27, "광진", "ISFP", "O");

console.log(studentsList);

const tableHeaderElem = document.getElementById("table-header");
headList.forEach(({ name }) => {
  // headList의 아이템(객체)의 name을 구조분해할당으로 가져온다.
  tableHeaderElem.innerHTML += "<th>" + name + "</th>";
});
// (headList.name)을 사용할 경우엔 headList > name으로 접근하는데, {name}이라는 객체를 직접 가져와서 구조분해하여 직접적으로 할당하는 것이다.(코드 줄이기 위함)
const studentsListElem = document.getElementById("data-list");

studentsList.forEach((item, index) => {
  let tempStr = "<tr>";
  headList.forEach(({ type }) => {
    if (type === "number") tempStr += `<th>${index + 1}</th>`;
    else tempStr += `<td>${item[type]}</td>`;
  });
  tempStr += "</tr>";
  studentsListElem.innerHTML += tempStr;
});
