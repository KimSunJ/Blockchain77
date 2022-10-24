const textList = document.getElementById("list");
function getList() {
  textList.innerHTML = "";
  axios.get("/api/list").then((resData) => {
    resData.data.list.forEach((todo) => {
      const tempElem = document.createElement("li");
      tempElem.classList.add("list-group-item");
      tempElem.innerHTML = `${todo.text} / 등록시간 : ${new Date(todo.time)}`;
      textList.append(tempElem);
    });
  });
}

getList();

document.forms["write"].onsubmit = function (e) {
  e.preventDefault();
  axios
    .post("/api/list", {
      name: document.forms["write"]["name"].value,
      text: document.forms["write"]["text"].value,
    })
    .then((data) => {
      getList();
    });
};
