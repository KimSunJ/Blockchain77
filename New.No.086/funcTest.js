// 오버로드, 오버라이드
class Parent {
  console(data) {
    console.log("Parent", data);
  }
  console(data1, data2) {
    console.log(data1, "은 data1이고", data2, "는 data2이다");
  }
}

const temp = { a: 1 };
const temp2 = { ...temp, a: 2 };
console.log(temp2);

class Child extends Parent {
  console(data) {
    console.log("Child", data);
  }
  // console을 주석처리 하면 부모의 console을 가져다 사용한다.
  // console을 주석처리 하지 않으면 "오버라이딩!"이 되어서 함수가 변경된다. overRide(덮어쓰는 기능)
}

const parent = new Parent();
parent.console("hi parent", "child");
const child = new Child();
child.console("hi child");
child.console("child", "parent");

const wtf = (...data) => {
  data.forEach((item) => console.log(item));
};

wtf(1, 2, 3, 4, "sad", "wee", "sdfsd");
