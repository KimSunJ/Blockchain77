// npm i ethereumjs-tx
// - 트랜잭션 관련 라이브러리
const ethTx = require("ethereumjs-tx").Transaction;

// 서명하기 전
// const tx = new ethTx({
//   from: "0xF19dd55e652F59AEf22731850c1FdB48cEf9e2c0",
//   to: "0x8197B616dA6B3bE862d30c5803D9aBd42c1547e9",
//   value: "0x" + Math.pow(10, 18).toString(16),
// });
// console.log(tx);
// console.log(tx.r);
// console.log(tx.v);
// console.log(tx.s);

// 서명 / transaction을 만든 상태에서 test
const tx = new ethTx({
  from: "0x4c70dcaA042Ca12284b1051f80EF9A3604ECf261",
  to: "0xB99cB0735D11ea508906c6f39A5e737F73Bf0f91",
  value: "0x" + Math.pow(10, 18).toString(16),
});
// Buffer 방식으로 서명
tx.sign(
  Buffer.from(
    "590d75334a6d12e2f9794bb11515dc1392cc1ba70d49879b198c1da433f573a1",
    "hex"
  )
  // private key - "0x" / 16진수라는 것을 알려주기 위해서
);
console.log(tx);
console.log(tx.r);
console.log(tx.v);
console.log(tx.s);

// sendSignedTransaction 방식
// console.log(tx.serialize().toString("hex"));
