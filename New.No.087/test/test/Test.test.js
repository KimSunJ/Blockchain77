const Test = artifacts.require("Test");

contract("Test", (accounts) => {
  console.log(accounts);

  let test;

  describe("Test Contract", () => {
    it("deploy", async () => {
      test = await Test.deployed();
    });

    it("getText", async () => {
      console.log(await test.getText.call());
    });

    it("setText", async () => {
      await test.setText("Hi! Hi!");
      console.log(await test.getText.call());
      // 자동으로 채굴을 해서 블록을 추가하느라 오래 걸리게 됨
    });
  });
});
