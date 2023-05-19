const Vote = artifacts.require("Vote");

module.exports = function (deployer) {
  deployer.deploy(Vote, ["핵밥", "냉면", "도시락", "햄버거"]);
};
