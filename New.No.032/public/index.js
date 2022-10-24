const todoList = document.getElementById("list");
function getList() {
  todoList.innerHTML = "";
  axios.get("/api/list").then((resData) => {
    resData.data.list.forEach((todo) => {
      const tempElem = document.createElement("li");
      tempElem.classList.add("list-group-item");
      tempElem.innerHTML = `${todo.text} / 등록시간 : ${new Date(todo.time)}`;
      //   tempElem.innerHTML = todo;
      todoList.append(tempElem);
    });
  });
}

getList();

document.forms["todo-form"].onsubmit = function (e) {
  e.preventDefault(); // 기본 이벤트를 막는다.
  // XMLHttpRequest => fetch/ajax => axios (발전 순서)
  // http 모듈 => express
  axios
    .post("/api/list", {
      name: document.forms["todo-form"]["do-name2"].value,
      time: Date.now(),
      //   test: 1,
      //   str: "홍길동",
    })
    .then((data) => {
      getList();
    });

  /* axios
    .delete("/api/list", {
      // 삭제
    })
    .then((data) => {});
  axios
    .put("/api/list", {
      // 수정
    })
    .then((data) => {}); */
  //   ======================
  //   const getUrl =
  //     "/api/add?name= " +
  //     document.forms["todo-form"]["do-name2"].value +
  //     "&str=이가원";
  //   axios.get(getUrl);
  //   ===========아래 구문과 같음===========
  //   axios.get(
  //     "/api/add?name= " +
  //       document.forms["todo-form"]["do-name2"].value +
  //       "&str=이가원"
  // string 형식이면 ok
  //   );
  // axios.post('라우터', 서버의 req.body)
  // 저 데이터를 보낸다.
  // '라우터?' 뒤에는 쿼리스트링이며, 쿼리스트링은 데이터가 아니다
  //   getList();
};
// 즉, form의 원래 이벤트를 사용하지 않겠다는 의미
