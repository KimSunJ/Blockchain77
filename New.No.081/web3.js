// console.log(Web3); // class 형식이 나온다
// transaction을 굳이 만들 필요가 없다

const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
const web3 = new Web3("http://localhost:8080");
// console.log(web3);
console.log(web3.eth);

// web3로 txpool 사용하는 방법 / json rpc 사용하는 방법
web3.eth.extend({
  property: "txpool",
  methods: [
    {
      name: "content",
      call: "txpool_content",
    },
  ],
});

web3.eth.txpool
  .content()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// 계정 표기
const accounts = web3.eth
  .getAccounts()
  .then((data) => data.forEach((item) => console.log(item)));

// 함수 version
// const test = async () => {
//   const accounts = await web3.eth.getAccounts();
//   accounts.forEach((item) => {
//     console.log(item);
//   });
// };
// test();

// 계정 잔액 표기
const test = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(web3.eth.getAccounts()); // Promise{<*****>}
  for (let i = 0; i < accounts.length; ++i) {
    const balanceWei = await web3.eth.getBalance(accounts[i]);
    const balance = web3.utils.fromWei(balanceWei);
    // utils는 여러가지 편의 메서드들을 갖고 있다. 제공한다.
    // fromWei는 Wei 단위의 금액을 다른 단위로 바꿔준다.
    // const balance = web3.utils.fromWei(balanceWei, "GWei");
    //  - 2번째 매개변수로 변환할 단위를 설정한다. 2번째 매개변수가 비어있으면 기본값은 ether다
    // console.log("(" + i + ")" + accounts[i] + "(" + balanceWei + "Wei)");
    console.log("(" + i + ")" + accounts[i] + "(" + balance + "Eth)");
  }
  document.getElementById("send").onclick = async () => {
    // 계정 언락
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "personal_unlockAccount",
        params: [accounts[0], "1234567890"],
      },
    });
    // 1eth 전송
    const sendTx = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei("1"),
    });
    console.log(sendTx);
  };
  const getTx = await web3.eth.getTransaction(
    "0x036dd4c3547ab09c280a2c7a910e652671cf8a5e919d267a50a454c4b12c9a4d"
  );
  console.log(getTx);

  //   blockHash: "0x81d86d85760a008a92ad0e657682f61b20d2fe77914a038e390d6917f70777a8";
  //   - 트랜잭션이 포함된 블록의 hash
  //   blockNumber: 1;
  //   - 트랜잭션이 포함된 블록의 높이
  //   from: "0xF19dd55e652F59AEf22731850c1FdB48cEf9e2c0";
  //   gas: 90000;
  //   gasPrice: "20000000000";
  //   hash: "0xe428b84f8735287e2089dfe6f93f40addf16c8b27588920ecc766201adfdb89f";
  //   input: "0x";
  //   nonce: 0;
  //  - 블록에서는 nonce가 난이도 문제를 풀기 위해 시도한 횟수
  //  - 이건 트랜잭션의 nonce => 보낸 사람이 보낸 트랜잭션의 개수
  //   r: "0xb9cbb486a6640b0fbc5a221b56908cd6d5059f16350fc4b3b1dea89cf64ae038";
  //   s: "0x67d9d1b2268d8e6f8655291ad9f7d4b25d829507cb1db7d6107794b92292a395";
  //   to: "0x8197B616dA6B3bE862d30c5803D9aBd42c1547e9";
  //   transactionIndex: 0;
  //   - 블록 내의 몇번째 트랜잭션인가
  //   v: "0x26";
  //   - RSV 전부 서명 관련 데이터이다.
  //   - 우리가 sendTransaction 할 때 자동으로 서명되기 때문에 서명한 적이 없다.
  //   - 어떤 것을 기준으로 서명하는가? unlock 할 때의 기준
  //   - 메타마스크에서 보낼 때에도 자동으로 서명한다. 서명을 우리가 허가하는데, 보낼때 한다
  //   value: "1000000000000000000";

  document.getElementById("stop").onclick = async function () {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_stop",
      },
    });
  };

  document.getElementById("start").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_setEtherbase",
        params: [accounts[0]],
      },
    });
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_start",
      },
    });
  };

  // geth로 서버 열었을 경우
  const txpoolGeth = (
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "txpool_content",
        params: [],
      },
    })
  ).data.result;
  console.log(txpoolGeth);
  // console.log(web3.eth.txpool)
  // web3.eth.txpool.content()
};
test();

// let block = await web3.eth.getBlock("latest");
// console.log("gasLimit: " + block.gasLimit);
// web3.eth
//   .getAccounts()
//   .then((accounts) =>
//     accounts.forEach((account, idx) =>
//       web3.eth
//         .getBalance(account)
//         .then((balance) =>
//           console.log(`(${idx})${account}(${web3.utils.fromWei(balance)} Eth)`)
//         )
//     )
//   );
