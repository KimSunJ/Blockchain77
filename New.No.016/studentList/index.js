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
    // name : name, 변수째로 넣어도 상관 없다. 객체 내에서 키와 값으로 매칭이 된다.
    age,
    area,
    mbti,
    bloodType,
  });
  // 객체 정의 시 객체 내에 다른 변수만을 넣으면 변수명과 변수의 값을 키와 값에 입력한다.
  // name 매개변수에 정의된 값을 객체의 name 키에 대한 값으로 정의한다.
  // 간단 예제
}
let temp = 100;
const tempObj = {
  temp,
  //temp : temp, << 24번 줄과 같다.
};
console.log(tempObj);

creatStudent("김성진", 27, "성남", "INTP", "B");
creatStudent("염예나", 22, "하남", "ENFP", "B");
creatStudent("정재훈", 30, "강남", "ENTP", "B");
creatStudent("김재일", 29, "용인", "ENFP", "AB");
creatStudent("이가원", 27, "광진", "ISFP", "O");

console.log(studentsList);

const tableHeaderElem = document.getElementById("table-header");
headList.forEach((item) => {
  tableHeaderElem.innerHTML += "<th>" + item.name + "</th>";
});

const studentsListElem = document.getElementById("data-list");
studentsList.forEach((item, index) => {
  // 각각의 아이템별로 한줄한줄마다 넣기위함
  let tempStr = "<tr>"; //<< 임시로 쓸 string을 초기화한다.
  headList.forEach((headItem) => {
    if (headItem.type === "number") tempStr += `<th>${index + 1}</th>`;
    else tempStr += `<td>${item[headItem.type]}</td>`;
  });
  tempStr += "</tr>";
  studentsListElem.innerHTML += tempStr;
});
// <tr> </tr> -> th , td 를 사용시 자동으로 열고 닫아준다.
// tr 은 자동 생성된다.
// temp는 임시코드 (이곳에만 사용할 코드로 이용할 경우 사용한다.)
