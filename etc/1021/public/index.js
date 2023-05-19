const todoList = document.getElementById("list");
function getList() {
  todoList.innerHTML = "";
  axios.get("http://localhost:8080/api/list").then((resData) => {
    resData.data.list.forEach((todo) => {
      const tempElem = document.createElement("li");
      tempElem.classList.add("list-group-item");
      tempElem.innerHTML = `${todo.text} / 등록 시간 : ${new Date(todo.time)}`;
      todoList.append(tempElem);
    });
  });
}
getList();

document.forms["todo-form"].onsubmit = function (e) {
  e.preventDefault();

  axios.post("http://localhost:8080/api/list", {
    name: document.forms["todo-form"]["do-name"].value,
    time: Date.now(),
  });
  // .then((data) => {
  //   getList();
  // });
};
