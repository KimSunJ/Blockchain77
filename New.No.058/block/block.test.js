const Block = require("./block");
const merkle = require("merkle");

describe("Block Test", () => {
  it("merkle Test", () => {
    // merkleRoot를 확인한다.
    const data = ["a", "b", "c"];
    const block = new Block(data);
    const merkleRoot = merkle("sha256").sync(data).root();

    expect(block.merkleRoot).toBe(merkleRoot);
  });
  it("hash test", () => {
    // hash를 확인한다.
    const data = ["a", "b", "c"];
    const block1 = new Block(data); // 첫번째 블록
    const block2 = new Block(data, block1); // 다음 블록
    // block1, block2 연결 된 블록
    const hash = Block.createHash(block2);
    // 이전블록 해시값이 없어서 같지 않은 결과가 나옴
    expect(block2.hash).toBe(hash);
  });
});
