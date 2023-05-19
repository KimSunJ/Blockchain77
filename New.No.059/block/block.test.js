const Block = require("./block");
const merkle = require("merkle");

describe("Block Test", () => {
  // describe("data가 배열이 아닐 때", () => {
  //   const data = "a";
  //   const block = new Block(data);

  //   it("merkleRoot가 비어있는가?", () => {
  //     expect(block.merkleRoot).toBe("");
  //   });

  //   it("hash가 비어있는가?", () => {
  //     expect(block.hash).toBe("");
  //   });
  // });
  describe("data가 배열일 때", () => {
    const data = ["a"];
    const block = new Block(data);

    it("merkleRoot가 비어있는가?", () => {
      const merkleRoot = merkle("sha256").sync(data).root();
      expect(block.merkleRoot).toBe(merkleRoot);
    });

    it("hash와 merkleRoot의 길이가 64인가?", () => {
      expect(block.merkleRoot).toHaveLength(64);
      expect(block.hash).toHaveLength(64);
      // toHaveLength << 길이 확인 matcher (중간에 오류가 생겼다면 "" 빈 string이 생길 수도 있다)
    });
  });
});
