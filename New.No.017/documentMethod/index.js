const root = document.getElementById("root");
// id가 root인 엘리먼트를 가져온다. 그리고 root변수에 초기화한다.

// root.onload
// onload 라는 메서드는 로드가 되었는가? 되었을때 실행된다. 즉, dom 생성됐을 때
root.onwheel = (e) => {
  // 마우스 휠에 대한 메서드
  console.log(e.target);
  // root 범위 안에서 휠을 작동해야 함
  // target은 root 범위 안의 어떤 위치에서 실행했는지 알려준다.
};

document.getElementById("name").onchange = (e) => {
  console.log(e.target.value);
  // e.target은 해당 메서드가 어디서 실행됐는지, 포커스(focus)가 기준이 될수도 있고, 마우스의 위치가 기준이 될 수도 있다.
  // onchange 완료 됐을 경우를 말함, 즉 변화가 완료됐을 때
};

document.getElementById("name").oninput = (e) => {
  // oninput 입력했을 때
  console.log(e.target.value);
};
// on 어쩌구 하는 메서드를 쓰는데 그게 무엇인가?
// on***은 전부 이벤트 함수라고 부른다.
// 즉, 클릭, 키다운, 입력 등 사용자의 입력에 대해서 이벤트가 발생했을 때 실행된다.

document.getElementById("name").addEventListener("click", () => {
  console.log("input을 클릭했어");
  // 클릭을 할 경우 메소드를 실행해준다.
});

for (let i = 0; i < 10; ++i) {
  const tempElem = document.createElement("div");
  // div 엘리먼트를 생성해서 tempElem 변수에 초기화한다.
  tempElem.innerHTML = i + "번째 DIV";
  // tempElem의 내용(innerHTML)을 'i번째 DIV'라고 정의한다.

  // root.append(tempElem);
  // root 엘리먼트에 tempElem 엘리먼트를 자식으로 추가한다.(하위 자식으로 추가한다.)
  // div에 다른 자식이 있어도 다른 div에 자신을 먼저 추가한다.
  root.prepend(tempElem);
  // root 엘리먼트에 tempElem 엘리먼트를 첫번째 자식으로 추가한다. (append의 역순)
}

document.getElementById("name").style.backgroundColor = "lightgray";
// html 문서에서 style 속성을 이용해서 inline 형싣으로 설정된 스타일과 마찬가지로 적용된다.
console.log(document.getElementById("name").style.border);
