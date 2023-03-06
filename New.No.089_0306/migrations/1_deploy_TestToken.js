const TestToken = artifacts.require("TestToken");

module.exports = function (deployer) {
  // deployer.deploy(Test, "solidity로 넘겨졌니?", 123);
  deployer.deploy(TestToken, "ST");
};
