const DogeToken = artifacts.require("DogeToken");

module.exports = function (deployer) {
  deployer.deploy(DogeToken, "DogeToken", "Doge", 1000);
};
