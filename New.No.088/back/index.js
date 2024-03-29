// cd back
// npm init -y
// npm i express cors truffle web3
// npm i -D prettier-plugin-solidity
// npx truffle init
// contracts 폴더 만든 후 컴파일
// npx truffle compile
// migration 작성 후
// npx truffle migration
const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const CounterContract = require("./build/contracts/Counter.json");

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.post("/api/increment", async (req, res) => {
  // api/increment >> 상대주소, /api/increment >> 절대주소
  const from = req.body.from;

  const nonce = await web3.eth.getTransactionCount(from);
  // nonce : 트랜잭션 갯수 << 매개변수로 전달된 지갑 주소의 Transaction 개수를 다음 트랜잭션에서 확인한다.
  //    즉, 생성된 트랜잭션들은 순서가 있다.
  //    - 메타마스크에서 다른 계정에 Ether를 보내고, 채굴을 했을 때 정상 작동하지 않는 경우가 있는데, 그 지갑 주소의 트랜잭션이 순서대로 되지 않았을 경우 발생하는 것이다.
  // transaction상에서는 난이도가 아니다.
  //    - 메타마스크에서는 3개의 트랜잭션을 기억하고 있어서 다음 nonce가 3으로 전달되고,
  //        Ganache 입장에서는 새로 시작해서 그 지갑 주소의 트랜잭션이 없을 때는 nonce가 0이어야하지만 메타마스크 기준으로 3으로 전달되어 정상적인 트랜잭션이 아니라고 판단되어 블록에 추가되지 않는다.

  const networkId = await web3.eth.net.getId();
  const CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;

  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.increment().encodeABI();
  //   트랜잭션을 바로 보내는(send) 것이 아닌 bytecode 형식으로 변환하여 data에 포함시킨다.
  //   const send = await web3.eth.sendTransaction(data);
  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };
  res.json(txObj);
});

app.listen(8080, () => {
  console.log("server start");
});
