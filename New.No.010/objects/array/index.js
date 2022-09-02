// 객체가 무엇인가? {}로 묶인 키와 값으로 이루어진 변수 (상자)?
const obj = {
  // obj = 객체
  a: 1,
  //   a가 키고 1이 값이다.
  // 키의 정식 명칭은 프로퍼티(property)다.
  b: function () {
    // b와 c는 함수 => 매서드(method)
    console.log("b");
  },
  c: () => {
    return "c";
  },
};

const arr = ["김성진", "염예나", "정재훈", "최원겸", "김선주"];
// 배열도 객체다.
// arr.push()
// push 메서드를 호출
console.log(arr.length);
// 배열의 길이를 나타내는 프로퍼티
// let tempReturn = arr.indexOf("오늘 점심 메뉴는?"); >> 1
let tempReturn = arr.indexOf(3);
// 배열에 있는 아이템을 찾아서 그 위치를 알려준다. 즉 위치를 리턴해준다.
// 없으면, -1, 첫번째에 있으면 0
//
tempReturn = arr.find(function (item) {
  console.log("item" + item);
  return item == 2;
});
// find는 검색할 때 사용할 코드
// 코드의 반환값이 true 나오는 함수를 넣어준다.
// find의 반환값은 아이템의 순서가 아닌 아이템 그 자체다.
// find 메서드는 매개변수로 함수를 전달한다.
// 매개변수에 해당하는 함수의 매개변수(item)은 배열의 각 아이템을 적용한다.
// find 함수는 배열의 각 아이템을 순서대로 매개변수 함수에 전달하여 return값을 확인한다.
// 매개변수함수에게서 받은 리턴 값이 true면 해당 아이템을 리턴하고 find 함수를 종료한다.

tempReturn = arr.find((item) => {
  return item[0] === "김";
});
// find 는 매개변수함수가 true인 아이템들 중 첫번째 아이템을 리턴해준다.
console.log(tempReturn);

tempReturn = arr.findIndex((item) => {
  return item[0] === "김";
});
// findIndex 는 매개변수함수가 true인 아이템들 중 첫번째의 배열 내에서 몇번째인지 리턴해준다.
console.log(tempReturn);

tempReturn = arr.map((item) => {
  return item + "오늘 출석함";
  return item[0] === "김";
  // >> 윗줄 return이 있기 때문에 아래 return 값이 안나오는것이다.
}); //해당 안되는 값들은 return 값을 주는 것이다.
//map은 매개변수함수의 return 값들을 배열로 리턴해준다.
console.log(tempReturn);

///////////////////////////

tempReturn = arr.filter((item) => {
  return item[0] === "김";
});
// filter 는 매개변수함수가 true인 아이템들을 배열로 리턴해준다.
console.log(tempReturn);

arr.forEach((item) => {
  console.log("forEach" + item);
});

//arr.forEach((item)=>{}) -> arr.forEach(function(item)) 같은 것

for (let i = 0; i < arr.length; i++) {
  console.log("for : +" + arr[i]);
}
// forEach 매서드는 아이템을 하나씩 함수에게 매개변수로 전달해 함수를 호출한다.
// 아래의 for 문과 같다.

console.log(arr);
arr.reverse();
// 순서 거꾸로 정렬
console.log(arr);

console.log(arr.join(" / "));
// 배열을 문자열로 바꿔줍니다. 매개변수로 아이템 사이에 넣을 문자를 입력합니다.
console.log(arr.toString());
// 문자열로 바꿈 (거의 모든 객체에 포함되어 있음)
console.log((14).toString(16));
// 16진수
console.log((16).toString(8));
// 16진수+8진수 >> 20

console.log(arr.slice(1, 3));
// arr의 앞에서부터 1의 값과, 3의 값까지 자름
// 0,1,2,3 (각 ,마다 숫자가 늘어난다고 생각하면 편하다.)
// [0"정재훈"(,)1"최원겸"(,)2"김성진"(,)3"염예나"(,)4"김선주"5] << 1에서 시작해서 3에서 끝난다.
// 1.최원겸,2김성진,3 << 이런 배열을 리턴한다.
console.log(arr.slice(1, -1));
// console.log(arr.slice(-1, 1)); 순서가 꼬이면 안된다.
// '-' 는 뒤에서부터 확인한다. 즉 5가 0이고, 4가 -1

// arr.splice(1, 3) 1부터 3개를 짜른다. 단, arr을 수정해버린다.
// console.log(arr.splice)

console.log(arr.sort());
// sort 메서드는 정렬을 해준다(오름차순)

console.log(arr.sort().reverse());

// console.log(
//   arr.sort((curr, next) => {
//     if (curr > next) return 1;
//     else if (curr < next) return -1;
//     else return 0;
// sort 메서드는 정렬을 해주는 메서드이다.
// 1, 0, -1 로 정렬 방식을 선택한다.
// 현재가 큰 것을 1로 주고 다음 것이 큰 것을 -1로 주면 오름차순으로 정렬된다.
//   })
// );
// 매개변수가 두개가 들어가는 함수가 필요하다

// console.log(
//   arr.sort((curr, next) => {
//     if (curr > next) return -1;
//     else if (curr < next) return 1;
//     else return 0;
// sort 메서드는 정렬을 해주는 메서드이다.
// 1, 0, -1 로 정렬 방식을 선택한다.
// 현재가 큰 것을 1로 주고 다음 것이 큰 것을 -1로 주면 오름차순으로 정렬된다.
//   })
// );
// 위와 반대 조건 시 내림 차순이다.

/////////////////////////////
const tempFind = (item) => {
  // item = arr [0] << item = 1
  // item = arr [2] << item = 3
  console.log(`item : ${item}`);
  console.log(`item === "최원겸":${item === "최원겸"}`);
  //   item = arr[2];
  return item === "최원겸";
  // item이 3이랑 같으면 true를 리턴하고 아니면 false를 리턴한다.
};

const arrFind = function () {
  for (let i = 0; i < arr.length; i++) {
    // i는 0부터 arr의 길이까지 하나씩 증가하면서 반복한다.
    console.log(`arr.lengh : ${arr.length}`);
    console.log(`i : ${i}`);
    console.log(`arr[${i}:${arr[i]}`);

    if (tempFind(arr[i])) return arr[i];
    // tempFind 함수를 호울하고 매개변수로 arr의 i번째의 아이템을 전달한다.
    // tempFind 함수가 true를 리턴(반환)하면 arr의 i번째 아이템을 리턴(반환)한다.
  }
};

// 메소드가 객체가 포함하는 함수 (객체 속에)
const tempArr = [
  { name: "김선주", age: 33, area: "대치동" },
  { name: "이가원", age: 20, area: "수원" },
  { name: "고우석", age: 28, area: "성남" },
];
// if를 제외하고는 ;를 적어줘야 한다 (끝나는 것)
console.log(tempArr.find((item) => item.area === "성남"));
console.log(tempArr.findIndex((item) => item.area === "수원"));
console.log(tempArr.filter((item) => item.area === "대치동"));
console.log(tempArr.map((item) => item.area === "성남"));
// 수정하며 내용을 확인해 보길...
