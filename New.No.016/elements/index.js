console.log(document.body.children);
// children은 엘리먼트의 자식 엘리먼트들을 가져온다, 호출한다.

console.log(document.body.childNodes);
// childNodes는 자식 노드들을 모두 가져온다.
// 리액트는 띄어쓰기를 없앤다. (>> 용량이 적다 / Node에선 띄어쓰기를 text로 인식한다.)
// tag << element Node는 객체로 감싸져있지 않는 객체를 말함

console.log(document.getElementById("parent").childNodes);
// element 또한 노드의 한 종류라고 생각하면 됨. element를 제외하고 다른 입력값을 노트라고도 한다.(dom에서 / 스크린샷 추가)
// dom쪽에서 node로 기록하기 위함

console.log(document.getElementById("parent").parentElement);
// 어떤게 부모 element인가 따지는 것.
// 부모 element를 가져온다.

console.log(document.getElementById("child1").parentElement);

console.log(document.getElementById("parent").firstElementChild);
// 첫번째 자식 element를 가져온다.

console.log(document.getElementById("parent").lastElementChild);
// 마지막 자식 element를 가져온다.
console.log(document.getElementById("child1").nextElementSibling);
// 다음 형제 엘리먼트를 가져온다. sibling -> 형제
console.log(document.getElementById("child1").previousElementSibling);
// 이전 형제 엘리먼트를 가져온다.

// console.log([]);

// const children = document.getElementById("parent").children;
// << 얘는 배열이 아니라 collection이라 한다.
// children 같이 이름만 가져왔을 때 컬렉션으로 가져온다.
let children = [...document.getElementById("parent").children];
// 대괄호로 묶어서 ... 을 같이 사용하여 배열로 바꿔야 한다. spread
console.log(children);
children.forEach((elem) => {
  console.log(elem);
});

console.log(document.getElementsByClassName("child"));
// 클래스명을 찾아서 Element들을 가져온다.
children = document.getElementsByClassName("child");

console.log(children[0]);

children[0].onclick = () => {
  alert("온클릭");
};
function onClick(num) {
  console.log(num + "번째 자식을 클릭했어!");
}
[...children].forEach(function (elem, index) {
  // forEach 매개변수함수에 매개변수로 (item, index) 형식으로 받을 수 있으며
  // item은 배열의 아이템 하나하나, index는 해당 아이템의 인덱스번호(몇번째 아이템인가?)
  // forEach는 배열의 아이템을 하나하나 가져와서 매개변수함수로 전달된 함수에 매개변수로 전달해서 함수를 호출한다.
  elem.onmouseover = () => {
    elem.classList.toggle("hover");
  };
  elem.onmouseleave = () => {
    elem.classList.toggle("hover");
  };
  // onmouseleave >> 마우스를 떠났다~ 이벤트 함수다~
  elem.onclick = function () {
    onClick(index + 1);
    console.log(elem.innerHTML);
    /* {
      if (elem.classList.contains("on")) {
        // contains 메서드는 매개변수로 전달된 문자열(string)이 클래스에 포함되어 있는지를 확인한다.
        elem.classList.remove("on");
        // remove 메서드는 클래스를 삭제한다.
      } else elem.classList.add("on");
      // classList는 엘리먼트의 클래스를 관리하는 객체이다.
      // add 메서드는 클래스를 추가한다.
      // 데이터를 바꾸지 않아도 클라스를 껐다켰다 할 수 있다.
    }*/
    elem.classList.toggle("on");

    // 위의 세줄을 한줄로 요약한 것.
    // toggle 메서드는 클래스가 있으면 없애고 없으면 추가한다.
  };
});

const tempArr = ["a", "b", "c"];

// forEach
tempArr.forEach((item, index) => {
  console.log(item + " : " + index + "번째 아이템");
  // forEach의 단점: 멈출수 없다. (break가 먹히지 않음)
});

// forEach 결과
// a : 0번째 아이템
// b : 1번째 아이템
// c : 2번째 아이템

for (let index = 0; index < tempArr.length; ++index) {
  const item = tempArr[index];
  // forEach에서 사용하는 item이랑 변수 통일하기 위해서 초기화
  console.log(item + " : " + index + "번째 아이템");
}

console.log(document.getElementById("parent").innerHTML);
// html 기준으로 텍스트를 가져온다.
console.log(document.getElementById("parent").innerText);
// html 태그 등등을 제외한 텍스트만 가져온다.

document.getElementById("btn").onclick = () => {
  // 버튼 클릭 시 실행
  console.log(document.getElementById("BTS").value);
  // BTS에 입력된 값을 로그로 출력한다.
  document.getElementById("btn").style.backgroundColor = "#ff0000";
};
