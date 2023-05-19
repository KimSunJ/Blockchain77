let num: number = 1234;
let str: string = "1234";
let bool: boolean = true;
let und: undefined = undefined;
let nul: null = null;

//und = 1234  // << let으로 선언하였어도 undefined로 지정해놨기 때문에 다른 자료형으로 변경 불가능하다.
// TypeScript는 자료형(Type)을 확인하기 때문에 같은 자료형만 변수에 정의할 수 있다.

num = 4321;
// console.log(num.length); / 숫자에는 길이가 없다.(오류 O)
console.log(str.length); // 문자열에는 길이가 있다.

let numUnd: number | undefined = undefined;
numUnd = 1234;
//  | 를 사용하여 type을 여러 개 사용할 수 있다.
// 앞의 것에 해당되지 않으면 뒤의 것으로 적용된다.

let any: any = undefined;
any = "1234";
any = 1234;
// any는 모든 자료형을 포함한다. (지양하는 쪽이 좋다.)
let unk: unknown = undefined;
unk = "1234";
console.log(any.length); // 모든 자료형을 포함하고 있다고 판단하여 각종 메서드, 프로퍼티를 모두 사용할 수 있다.
// console.log(unk.length); // 자료형을 모른다고 판단하여 각종 메서드, 프로퍼티를 사용할 수 없다.
if (typeof unk === "string") {
  // Type을 확인 후에 해당 타입에 대한 메서드, 프로퍼티를 사용할 수 있다.
  console.log(unk.length);
}

let obj: { a: number; b?: string } = { a: 1 };
// ?는 undefined를 포함한다. //b는 string도 맞지만 undefined를 포함한다.
obj.b = "1234";

let arr: Array<number> = [1, 2, 3];
// arr.push("asdf");
let arr1: [number, string] = [1, "1"];
// arr1.push(1);
let arr2: string[] = ["1", "a", "b"];
// let arr3: Array<any> = [undefined, null, 1, "asdf"];

function funcA(): void {
  // return이 없는 함수엔 void type을 사용한다.
  console.log("funcA");
}

const funcB = function (): number {
  return 11;
};

const funcC = (): string => {
  // console.log("asdf");
  return "asdf";
};
// 함수의 return에 대한 type은 () 뒤에 붙인다.

function sumA(a: number, b: number): number {
  return a + b;
}
console.log(sumA(1, 2));
// function sumA(a, b): number {
//   return a + b;
// } >> a와 b에 대한 자료형을 지정해주지 않으면 자동으로 any로 인식되기에 자료형을 number로 지정해줘야한다.

const sumB = function (numbers: { a: number; b: number }): number {
  return numbers.a + numbers.b;
};

const sumC = ({ a, b }: { a: number; b: number }): number => {
  return a + b;
};
// { a: number; b: number } >> ; 는 타입스크립트에서 지정해준 구문

interface INumbers {
  a: number;
  b: number;
}

function sumD({ a, b }: INumbers): number {
  return a + b;
}
