const createMerkle = require("./merkleTree");
const libMerkle = require("./merkleTree");
const merkle = require("merkle");

// 테스트 함수들을 실행하는데, 묶어서 실행할 수 있다.
const data = ["asdfasdf", "123123123", "1213423", "sdfsadf", "werwerw"];

// describe: 테스트의 묶음(그룹을 지어줄 수 있다고 보면 된다.
describe("테스트들의 묶음 단위 내용", () => {
  // 각각의 테스트들을 여기에 작성해주면 된다.
  // 테스트 단위
  it("테스트의 내용", () => {
    const merkleTree = merkle("sha256").sync(data);
    const root = merkleTree.root();
    console.log(root);
  });
  it("테스트의 내용2", () => {
    console.log(libMerkle(data));
  });
  it("테스트의 내용3", () => {
    console.log(createMerkle(data));
  });
  it("테스트의 내용4", () => {
    // expect 함수로 비교함수들을 사용할 수 있게 해준다.
    // expect의 매개변수로 비교할 값을 넣어주고,
    // expect().toBe()의 toBe() 매개변수로 앞의 값과 비교할 값을 넣어준다.
    // 단순한 데이터비교를 위함 A와 B를 넣었다고 하면 A === B
    expect(libMerkle(data)).toBe(createMerkle(data));
  });
});
