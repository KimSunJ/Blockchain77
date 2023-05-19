var num = 1234;
var str = "1234";
var bool = true;
var und = undefined;
var nul = null;
//und = 1234  // << let으로 선언하였어도 undefined로 지정해놨기 때문에 다른 자료형으로 변경 불가능하다.
// TypeScript는 자료형(Type)을 확인하기 때문에 같은 자료형만 변수에 정의할 수 있다.
num = 4321;
// console.log(num.length); / 숫자에는 길이가 없다.(오류 O)
console.log(str.length); // 문자열에는 길이가 있다.
var numUnd = undefined;
numUnd = 1234;
//  | 를 사용하여 type을 여러 개 사용할 수 있다.
// 앞의 것에 해당되지 않으면 뒤의 것으로 적용된다.
var any = undefined;
any = "1234";
any = 1234;
// any는 모든 자료형을 포함한다. (지양하는 쪽이 좋다.)
var unk = undefined;
unk = "1234";
console.log(any.length); // 모든 자료형을 포함하고 있다고 판단하여 각종 메서드, 프로퍼티를 모두 사용할 수 있다.
// console.log(unk.length); // 자료형을 모른다고 판단하여 각종 메서드, 프로퍼티를 사용할 수 없다.
if (typeof unk === "string") {
    // Type을 확인 후에 해당 타입에 대한 메서드, 프로퍼티를 사용할 수 있다.
    console.log(unk.length);
}
var obj = { a: 1 };
// ?는 undefined를 포함한다. //b는 string도 맞지만 undefined를 포함한다.
obj.b = "1234";
var arr = [1, 2, 3];
// arr.push("asdf");
var arr1 = [1, "1"];
// arr1.push(1);
