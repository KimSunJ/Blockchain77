// const todoList = [
//   { list: "과제하기" },
//   { list: "당근 거래하기" },
//   { list: "Notion 복습하기" },
// ];

console.log(todoList);

// 기존 추가되어 있는 리스트 html 출력
const todoListElem = document.getElementById("check");
todoList.forEach((item) => {
  todoListElem.innerHTML +=
    "<p>" + "<input type='checkbox'>" + item.list + "</p>";
});

// console.log(todoList);
// todoList.forEach((elem) => {
//   console.log(elem);
// });

// console.log(document.getElementsByClassName("done"));
// dolist = document.getElementsByClassName("done");

// todoList[2].checked = () => {
//   alert("완료했으~");
// };

// console.log(document.getElementById("lists").innerHTML);
// 추가부분
document.getElementById("plus").onclick = () => {
  console.log(document.getElementById("plus-list").value);
  document.getElementById("plus");
  const plusListElem = document.getElementById("check");
  plusList.forEach((item) => {
    plusListElem.innerHTML +=
      "<p>" + "<input type='checkbox'>" + item.list + "</p>";
  });
};

document.getElementById("delete").onclick = () => {
  console.log(document.getElementById("plus-list").value);
  document.getElementById("plus");
};
// function Push() {
//   const plus = document.getElementById("plus-list");
//   plusArray.push(plusItem.value);
// }
// let plus = [...todoList.getElementById("plus")];
//
// const plusElem = document.getElementById("plus");
// plus.forEach((item) => {
// plusElem.innerHTML += "<p>" + "<input type='checkbox'>" + item.list + "</p>";
// });
