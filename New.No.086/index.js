const Compiler = require("./compiler");
const Client = require("./web3");
// const temp = Compiler.compile("Test.sol");
const {
  Test: { abi, bytecode },
} = Compiler.compile("Test.sol");
// data {"language":"Solidity","sources":{"Test.sol":{"content":"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.15;\n\ncontract Test {\n  string text;\n\n  constructor() {\n    text = \"Hi Block7\";\n  }\n\n  function getText() public view returns (string memory) {\n    return text;\n  }\n\n  function setText(string memory _value) public {\n    text = _value;\n  }\n}\n"}},"settings":{"outputSelection":{"*":{"*":["*"]}}}}
// fileName이라고 매개변수를 넣어줬지만 "sources":"Test.sol" 파일 이름이 뜬다.
// console.log("temp", temp);
// const tempDate = new Date(); // 인스턴스 반환
// console.log(abi);

const client = new Client("http://127.0.0.1:8545");
const txObj = { data: bytecode };
const contract = new client.web3.eth.Contract(abi);
// Contract 클래스로 객체(인스턴스) 생성 하기 때문에 client 앞에 new 를 붙임

async function init() {
  const instance = await contract.deploy(txObj).send({
    from: "0x24444bE6eDE5383CBe83827708aDB7D5cff99a37",
    gas: 1000000,
  });
  console.log(instance);
  console.log(instance.options.address); // Contract Address (CA : 0xfF69d571496B838c37cFF4a9807b2316371AB0dA)
}
// init(); >> 스마트 컨트랙트에 넣는 내용으로 보낸다.

async function test() {
  const accounts = await client.web3.eth.getAccounts();
  // client를 호출만 할 뿐이라 new를 사용 하지 않음
  //   console.log(accounts);
  const ca = "0xfF69d571496B838c37cFF4a9807b2316371AB0dA";
  const deployed = new client.web3.eth.Contract(abi, ca);
  let text = await deployed.methods.getText().call();
  console.log("text", text);

  await deployed.methods.setText("what is lunch").send({ from: accounts[1] });
  text = await deployed.methods.getText().call();
  console.log("text", text);
  const balance = await client.web3.eth.getBalance(accounts[1]);
  console.log("balance :", balance);
  // 가스(내가 쓴 돈) = 1가스당 * 수수료(가스비 * 가스 한도 = 수수료)
}
test();
