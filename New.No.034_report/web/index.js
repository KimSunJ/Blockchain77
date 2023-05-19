const logId = document.getElementById("id2");
const logPw = document.getElementById("pw2");
const userName = document.getElementById("name");
const userGender = document.getElementById("gender");
const userAge = document.getElementById("age");
const userId = document.getElementById("id");
const userPw = document.getElementById("pw");
const title = document.getElementById("board-title");
const text = document.getElementById("board-text");

document.getElementById("sign-up").onclick = async function (e) {
  e.preventDefault();
  [...document.getElementsByClassName("sign-input")].forEach((elem) => {
    elem.classList.toggle("on");
  });
  [...document.getElementsByClassName("btn-box on")].forEach((elem) => {
    elem.classList.toggle("on");
  });
};

document.getElementById("sign-in").onclick = async function (e) {
  e.preventDefault();
  if (!logId.value && !logPw.value) return;
  if (!logId && !logPw) {
    logId.focus();
    return;
  }
  try {
    const data = await axios.post("/api/user/login", {
      id: document.forms["log-info"].id2.value,
      pw: document.forms["log-info"].pw2.value,
      name: document.forms["user-info"].name.value,
    });
    console.log(data.data);
    document.forms["log-info"].id2.value =
      document.forms["log-info"].pw2.value =
      document.forms["user-info"].name.value =
        "";
    document.forms["log-info"].id2.value = document.forms[
      "log-info"
    ].pw2.value = "";
    console.log(data.data.data2);
    const userName = data.data.data2;
    document.getElementById("user-name").innerText =
      userName + " 님 환영합니다.";

    if (data.data.bool != true) return;

    [...document.getElementsByClassName("btn-box")].forEach((elem) => {
      elem.classList.toggle("on");
    });
    [...document.getElementsByClassName("out-box")].forEach((elem) => {
      elem.classList.toggle("on");
    });
    [...document.getElementsByClassName("board-add")].forEach((elem) => {
      elem.classList.toggle("on");
    });
  } catch (err) {
    console.error(err);
  }
};
// 가입 완료 누를 경우
document.getElementById("regist").onclick = async function (e) {
  e.preventDefault();
  console.log("가입 완료");

  if (!userName.value || !userAge.value || !userId.value || !userPw.value)
    return;

  // if (!e.target["user-info"].value) {
  //   e.target["log-info"].focus();
  //   return;
  // }
  try {
    const data = await axios.post("/api/user/regist", {
      id: document.forms["user-info"].id.value,
      pw: document.forms["user-info"].pw.value,
      name: document.forms["user-info"].name.value,
    });
    document.forms["user-info"].id.value =
      document.forms["user-info"].pw.value =
      document.forms["user-info"].name.value =
        "";
    console.log(data.data);
    // if (data.data.status == 200) {
    //   e.target["user-info"].value = "";
    // }
    [...document.getElementsByClassName("sign-input")].forEach((elem) => {
      elem.classList.toggle("on");
    });
    [...document.getElementsByClassName("btn-box")].forEach((elem) => {
      elem.classList.toggle("on");
    });
  } catch (err) {
    console.error(err);
  }
};

document.getElementById("board-add").onsubmit = async function (e) {
  e.preventDefault();
  if (!title.value) {
    title.focus();
    return;
  }
  if (!text.value) {
    text.focus();
    return;
  }
  try {
    const data = await axios.post("/api/board/add", {
      title: title.value,
      text: text.value,
      uptime: Date.now(), // app.update라고도 한다.
    });
    console.log(data.data);
    if (data.data.status == 200) {
      title.value = text.value = "";
    }
    // [...document.getElementsByClassName("board")].forEach((elem) => {
    //   elem.classList.toggle("on");
    // });
  } catch (err) {
    console.error(err);
  }
  getList();
};

const tempData = [
  [
    { title: "title1", text: "1sdlkfjsdf" },
    { title: "title2", text: "2sdlkfjsdf" },
    { title: "title3", text: "3sdlkfjsdf" },
    { title: "title4", text: "4sdlkfjsdf" },
    { title: "title5", text: "5sdlkfjsdf" },
  ],
  [
    { title: "title6", text: "6sdlkfjsdf" },
    { title: "title7", text: "7sdlkfjsdf" },
    { title: "title8", text: "8sdlkfjsdf" },
    { title: "title9", text: "9sdlkfjsdf" },
  ],
];

let maxCount = 2;
let count = 0;

const pageElem = document.getElementById("page");
const listElem = document.getElementById("list");

async function getList() {
  try {
    const data = await axios.get("/api/board?count=" + count);
    pageElem.innerHTML = "";
    maxCount = data.data.maxCount;
    for (let i = 0; i < maxCount; ++i) {
      const tempLi = document.createElement("li");
      tempLi.innerText = i + 1;
      tempLi.onclick = function (e) {
        count = i;
        pageElem.getElementsByClassName("now")[0].classList.remove("now");
        tempLi.classList.add("now");
        getList();
      };
      if (count === i) {
        tempLi.classList.add("now");
      }
      pageElem.append(tempLi);
    }

    listElem.innerHTML = "";

    data.data.list.forEach((data, index) => {
      const tempLi = document.createElement("li");
      const tempTitle = document.createElement("div");
      const tempH3 = document.createElement("h3");
      const tempImg = document.createElement("img");
      const tempText = document.createElement("div");
      const tempP = document.createElement("p");
      const tempTextarea = document.createElement("textarea");
      const tempBtnBox = document.createElement("div");
      const tempDelBtn = document.createElement("img");
      const tempEditBtn = document.createElement("img");
      const tempcancleBtn = document.createElement("img");

      tempTitle.classList.add("title");
      tempTitle.onclick = function (e) {
        tempText.classList.toggle("on");
        tempImg.classList.toggle("on");
        tempText.classList.remove("edit");
      };
      tempText.classList.add("text");
      tempImg.src = "./imgs/angle-up-solid.svg";
      tempImg.alt = "list-item-btn";
      tempH3.innerText = data.title;
      tempP.innerText = data.text;
      tempTextarea.value = data.text;

      // console.log(data.data.data2);

      tempBtnBox.classList.add("list-btn-box");
      // 삭제 버튼 활성화
      tempDelBtn.src = "./imgs/trash-can-regular.svg";
      tempDelBtn.alt = "delete-btn";
      tempDelBtn.classList.add("delete");
      tempDelBtn.onclick = async function (e) {
        try {
          const data = await axios.post("/api/board/delete", {
            count,
            num: index,
          });
          getList();
          console.log(data.data);
        } catch (err) {
          console.log(err);
        }
      };

      // 수정 버튼 활성화
      tempEditBtn.src = "./imgs/keyboard-regular.svg";
      tempEditBtn.alt = "edit-btn";
      tempEditBtn.onclick = async function (e) {
        if (tempText.classList.contains("edit")) {
          try {
            const data = await axios.post("/api/board/update", {
              count,
              num: index,
              text: tempTextarea.value,
              time: Date.now(),
            });
            getList();
            console.log(data.data);
          } catch (err) {
            console.log(err);
          }
        } else {
          tempTextarea.value = data.text;
          tempText.classList.add("edit");
        }
      };
      //
      tempcancleBtn.src = "./imgs/xmark-solid.svg";
      tempcancleBtn.alt = "cancle-btn";
      tempcancleBtn.classList.add("cancle");
      tempcancleBtn.onclick = function (e) {
        tempText.classList.remove("edit");
      };
      //
      tempBtnBox.append(tempEditBtn);
      tempBtnBox.append(tempDelBtn);
      tempBtnBox.append(tempcancleBtn);

      tempTitle.append(tempH3);
      tempTitle.append(tempImg);
      tempText.append(tempP);
      tempText.append(tempTextarea);
      tempText.append(tempBtnBox);
      tempLi.append(tempTitle);
      tempLi.append(tempText);
      listElem.append(tempLi);
    });
  } catch (err) {
    console.error(err);
  }
}
getList();
// 새로고침하면 초기화
