console.log(window.location);
// location은 현재 주소에 대한 내용을 담고 있다.
// window가 뭐길래 주소 내용을 담고 있는가?
// window는 BOM(Browser Object Model)이다.
// 브라우저의 정보들을 갖고 있다.
console.log(location);
// window는 root 객체이다.
// root는 최상위 폴더 / 객체 / 클래스? 등을 뜻한다.

console.log(window.navigator);
// 생각보다 자주 쓸지도 모름
// 검색어를 입력시 주소가 어떤것인지를 받아서 서버쪽으로 보낸다.
console.assert(window.navigator.userAgent);
// 브라우저와 OS관련된 정보가 정의되어 있다. 즉, 현재 브라우저나 OS등을 확인할 수 있다.
// userAgent를 정규표현식을 사용해 원하는 정보만 가져올 수도 있다. (다만, 라이브러리를 사용해서 쉽게 처리가 가능하다.)
// PS. 애플 계열은 IOS, iPhone, iPad, Mac으로만 나타난다.
// 대기업들은 클린 횟수도 체크한다. (userAgent)

// ------------------------------- dom ------------------------------- //
console.log(document.head);

console.log(document.body);
// 적혀있는 그대로 body의 정보를 받아온다.
// document는 HTML 파일 구조에 대해서 정의한다.
// document는 DOM(Document Object Model)이다.
// script연결을 body에 해주면 출력된다.(head와 같이)
// HTML 구조의 root이다.
console.log(document);
console.dir(document);
// 구조 자체를 쭉 보여주는 것 (데이터적 구조_객체)
// console.log로 나오지 않는 것은 dir로 확인하자. (함수가 아닌 HTML 객체가 나오는 경우가 있다.)
// console.log 확인 시 html 구조가 나오면 dir로 확인하는 경우가 있다.
// console에 대해서는 Node.js에서 다시....
// getElementIdBy (중복된 id를 사용할 수 없다. 자바스크립트에서 id를 하나밖에 사용 못한다.)
// console.time _ 시간 잴때 사용하는 것
// BOM / DOM feat. MVC(Model View Controller)

// Node, Tag, Element란 무엇인가?
// Tag는 html에서 사용하는 명령어의 이름을 뜻한다. ex) html, body, div, ...
// Tag는 여는 Tag와 닫는 Tag로 사용한다. <div></div>
// Element는 무엇인가 >> 여는 Tag와 닫는 Tag를 모두 포함하는 내용이다 라고 했다. / Tag에 대한 정보들을 말한다. (CSS가 포함되는 것은 다른 의미다.)
// DOM(document) 내에서 정의되는 Tag의 내용이다.
// ex) document.getElementById('name') >> name을 id로 갖는 Tag를 찾는다.
// 정확히는 Element를 찾는다.
// Tag && Element의 차이는 무엇이냐? Tag는 이름 그 자체다. Element는 객체다.
// 객체는 키와 값으로 이루어진 것. ex) 블록체인 7기 라는 객체 안에 사람들 (data)가 존재한다. 라고 정의 할 수 있다.
// 즉, Javascript에서 HTML 구조를 수정하거나 내용을 추가하거나 등등에서 사용하는 Tag에 대한 객체다.
// HTML 파일에서 Tag(여는 태그(속성들이 포함 meta에도 적용 가능하지만 적용이 안될수도 있음), 자식들 포함)에 사용된 내용들을 모두 포함하는 것이 Element다.
// const 블록7기 = {
//   김성진: { name: 김성진, age: 27, gender: 남 },
//   염예나: { name: 염예나, age: 22, gender: 여 },
//   정재훈: "이름: 정재훈, 나이: 30, 성별: 남", >> 찾기가 힘들기 때문에, 정규표현식으로 사용해야 한다.
// };
// 블록7기.김성진.neme;
// const document = {
// getElementById:(id)=>{
//   }
// }
// Method도 없어질 수도 있기 때문에 잘 사용 안함(getElementById는 Method다.)
// 객체 안에 있는 함수를 Method라고 부른다.
// 객체의 키는 프로퍼티(property)라고 부른다.
// 객체 내의 데이터에 대한 이름. (= 키), 변수명 -> 프로퍼티
// console.assert(window.navigator.userAgent); window 라는 객체 안의 navigator객체 안의 userAgent 안의 객체를 불러온것.
// 김성진: { name: 김성진, age: 27, gender: 남 }, 김성진이라는 변수를 가져오기때문에 undefined가 뜬다. string으로 인식이 안되기 때문이다
// 김성진: { name: "김성진", age: 27, gender: 남 }, "김성진"으로 사용해야 문자열로 사용 >> 객체 안에 객채를 넣는 것이 좋은 방법
console.log(document.getElementById("test").outerHTML);
console.log(document.getElementById("test").innerHTML);
// innerHTML은 여는 태그와 닫는 태그 사이의 데이터를 문자열로 받는다.(Tag 안에 내용만 출력한다.)
// outerHTML은 여는 태그와 닫는 태그를 모두 포함하여 데이터를 문자열로 받는다. (Element객체를 출력한다.)
// tag의 스타일이 될수도 있다. elements를 사용하는 경우는 class를 사용할 경우다.
// Element의 id를 찾아서 가지고 온다.
// html에서 사용하는 명령어 tag
// div -> 영역 divide
console.log(document.getElementById("test").id);
console.log(document.getElementById("test").style.border);
// id가 "test"인 style 객체 안에 border 키를 '1px solid black'로 값을 지정해준다.
// Element 안에서 인식되는 것
// 객체안의 객체안의 키 or 값으로 이뤄진다.

document.getElementById("test").style.border = "10px solid red";
// Element에서 수정한 것처럼 이렇게 직접적으로 적용할 수도 있다.
console.dir(document.getElementById("test"));
// 블록7기.이재혁.style.겉옷 = null

// 상속: 상속하는 객체의 정보(프로퍼티, 메서드 모두 포함)를 갖는 다른 객체를 만드는 행위?
// A = {a, b, c} => B가 A를 상속한다. => B = {a, b, c}

// const person = { name: "", age: 0, gender: 0 };
// const kim = { name: "김성진", age: 27, gender: 1 };
// const yeom = { name: "염예나", age: 22, gender: 4 };
// const jung = { name: "정재훈", age: 30, gender: 1 };
// person을 상속해서 kim, yeom, jung을 만들 수 있다. (생성 가능)

// Javascript 프로토타입(prototype) 형태로 되어 있다.
// Javascript는 기본적으로 Node.js를 기준으로 하고 있다.
// Node를 이용하여 Element, document 등을 생성한다.
// 프로토타입(prototype)은 상식적으로 생각했을 때 테스트를 위한 임시 기계?
// 프로토타입(prototype)을 업그레이드, 즉 기능을 추가하거나 필요치 않은 기능을 삭제하거나 등등 더 좋게 만들어서 다음 것을 만든다?

// 함수란, 기능하는 것
// 매개변수 함수에 전달하는 값
// 링크 파일 가져오는 명령어
// src -> source 의 약자
// document -> html을 구조로 가져오는 객체
// alt -> 이미지를 대체하는 텍스트 (정상적으로 이미지를 불러오지 않을 경우)
// position -> css 중 하나고, 문서 상에 요소를 배치하는 방법 어디에 위치시킬 것인지에 대한 방식 ()
