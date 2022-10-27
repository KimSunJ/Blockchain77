// const e = require("express");

document.getElementById("menu-btn").onclick = function (e) {
  document.getElementById("user-input-container").classList.toggle("on");
};

document.getElementById("board-add").onsubmit = async function (e) {
  e.preventDefault();
  if (!e.target["board-title"].value) {
    e.target["board-title"].focus();
    return;
  }
  if (!e.target["board-text"].value) {
    e.target["board-text"].focus();
    return;
  }
  // console.log(e.target["board-title"].value);
  // console.log(e.target["board-text"].value);
  // [오후 수업]
  try {
    const data = await axios.post("/api/board/add", {
      title: e.target["board-title"].value,
      text: e.target["board-text"].value,
      uptime: Date.now(), // app.update라고도 한다.
    });
    console.log(data.data);
    if (data.data.status == 200) {
      e.target["board-title"].value = e.target["board-text"].value = "";
    }
  } catch (err) {
    console.error(err);
  }
  getList();
};

// form 안에 있는 button은 기본적으로 form의 submit을 실행

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

let maxCount = 2; // 총 페이지수
let count = 0; // 현재 페이지

const pageElem = document.getElementById("page");
const listElem = document.getElementById("list");

async function getList() {
  try {
    const data = await axios.get("/api/board?count=" + count);
    // count = 0 => /api/board?count
    // console.log(data.data.maxCount);

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
    // [오후 수업]
    //  초기화
    data.data.list.forEach((data, index) => {
      // tempData[count].forEach((data) => {
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

      tempBtnBox.classList.add("list-btn-box");
      // 버튼 활성화 (해당 클래스)
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

document.getElementById("sign-in").onclick = async function (e) {
  e.preventDefault();
  const data = await axios.post("/api/user/login", {
    id: document.forms["user-info"].id.value,
    pw: document.forms["user-info"].pw.value,
  });
  document.forms["user-info"].id.value =
    document.forms["user-info"].pw.value =
    document.forms["user-info"].name.value =
      "";

  // const temp = parseJwt(document.cookie.split("=")[1]);
  // console.log(temp.name);

  const tempName = JSON.parse(
    window.atob(document.cookie.split("=")[1].split(".")[1])
  ).name;

  console.log(tempName);

  if (tempName) {
    document.getElementById("user-name").innerText = tempName + "님 어서오세요";
    [...document.getElementsByClassName("btn-box")].forEach((elem) => {
      elem.classList.toggle("on");
    });
    [...document.getElementsByClassName("sign-input")].forEach((elem) => {
      elem.classList.toggle("on");
    });
  }
};

// function parseJwt(token) {
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     window.atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }

document.getElementById("sign-up").onclick = async function (e) {
  e.preventDefault();
  const data = await axios.post("/api/user/regist", {
    id: document.forms["user-info"].id.value,
    pw: document.forms["user-info"].pw.value,
    name: document.forms["user-info"].name.value,
  });
  document.forms["user-info"].id.value =
    document.forms["user-info"].pw.value =
    document.forms["user-info"].name.value =
      "";
};

document.getElementById("sign-out").onclick = async function (e) {
  e.preventDefault();
  document.getElementById("user-name").innerText = "";
  [...document.getElementsByClassName("btn-box")].forEach((elem) => {
    elem.classList.toggle("on");
  });
  [...document.getElementsByClassName("sign-input")].forEach((elem) => {
    elem.classList.toggle("on");
  });
};

// axios.post("/api/board/add").then((data) => {
//   console.log(data);
// });
