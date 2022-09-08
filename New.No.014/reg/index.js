// 정규표현식
const reg1 = /aa/;
const reg2 = new RegExp("aa");
// 규칙을 가진 문자열을 찾기 위해 사용한다.
const tempReg = /[3,6,9]/;
// [] 내부 중의 하나 => 3 || 6 || 9 (or)
const tempReg1 = /[0-9]/;
// 0부터 9다 (0~9) _ 범위
const koreanReg = /가-힡/;
// 받침을 포함하여 범위 안의 한글을 찾는다.
let emailReg =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// x*은 횟수와 상관 없이 들어가는 문자 <= x를 몇번이고 넣을 것을 찾는다.
// ^x => x로 시작한다.
// [0-9a-zA-Z] 내부에서 하나다 , * 0 이상
// x? => x가 없거나 딱 한번 들어갈 수 있다.
// \w => 문자나 숫자다
//  \s => 모든 공백을 뜻한다. (띄어쓰기, 탭, 줄바꿈 등등)
// {} => 개수이다. 몇개인가? (2개 이상 3개 이하 / 도멤인 개수 ex) kr > 2 / com > 3)
// 정규 표현식 뒤에 붙는 문자들 flag (ex) i
// i 는 대소문자 무시, g는 중복가능
// x$ => x로 끝난다.
// const inputEmail = prompt("이메일을 입력하세요");
// console.log(inputEmail.match(emailReg));
console.log("aasdfasdfasdfasdfsdf".replace("ffs", ""));
console.log("aasdfasdfasdfasdfsdf".replace(/fs/, g, ""));
console.log("aasdfasdfasdfasdfsdf".replace(/\*\*\[\]\-/g, g, ""));
// 검색한 것에 있어서 문자열로 바꿔준다.
// 대소문 구분하지 않고 싱행
