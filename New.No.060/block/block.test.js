const Block = require("./block");
const merkle = require("merkle");

describe("Block Test", () => {
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
    });
  });
  describe("difficulty check", () => {
    const data = ["a"];
    const block = new Block(data);
    let tempDifficultyOptions;
    // getDifficulty 호출 시 사용되는 객체 정의할 변수
    beforeEach(() => {
      // 테스트할 때마다 코드를 실행하여 tempDifficultyOption과 블록의 높이를 다시 설정(재정의)한다.
      tempDifficultyOptions = {
        previousDifficulty: 9,
        adjustmentDifficulty: 10,
        adjustmentTimestamp: Date.now(),
        difficultyAdjustmentInterval: 10,
        averageGenerationTime: 60 * 1000,
      };
      block.height = 30;
    });

    it("높이가 0~9까지 난이도는 0인가?", () => {
      for (let i = 0; i < 10; i++) {
        block.height = i; // 높이가 0~9까지
        block.getDifficulty(tempDifficultyOptions); // 난이도를 재설정한다.
        expect(block.difficulty).toBe(0); // 그 난이도가 0인가?
      }
    });
    it("높이가 10~19까지 난이도는 1인가?", () => {
      for (let i = 10; i < 20; i++) {
        block.height = i; // 높이가 10~19까지
        block.getDifficulty(tempDifficultyOptions); // 난이도를 재설정한다.
        expect(block.difficulty).toBe(1); // 그 난이도가 0인가?
      }
    });
    it("기준 시간보다 빠르게 생성되었을 경우 난이도를 높이는가?", () => {
      tempDifficultyOptions.adjustmentTimestamp -= 20 * 1000;
      // 10개 전 블록이 20초(60 * 1000 기준시간의 50% 20초)전에 생성되었다.
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty + 1
      );
      // 10개 전 블록의 난이도에 1이 추가되었는가?
    });
    it("기준 시간 허용 범위 이내에 생성되었을 경우 난이도를 유지하는가?", () => {
      tempDifficultyOptions.adjustmentTimestamp -=
        tempDifficultyOptions.averageGenerationTime;
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(tempDifficultyOptions.adjustmentDifficulty);
      // 10개 전 블록의 난이도가 현재 난이도와 같은가?
    });
    it("기준 시간보다 오래 걸려서 생성되었을 경우 난이도를 낮추는가?", () => {
      // 기준 시간 60초, 50%~150% (0.5~1.5)
      tempDifficultyOptions.adjustmentTimestamp -= 100 * 1000;
      // 10개 전 블록이 100초 전에 생성되었다.
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty - 1
      );
      // 10개 전 블록의 난이도보다 현재 난이도가 1 낮은가?
    });
  });
});
