const nowAccountElem = document.getElementById("now-account");
const balanceElem = document.getElementById("balance");
const toElem = document.getElementById("to");
const etherElem = document.getElementById("ether");

console.log(window.ethereum);
// getBlock & getTransaction 메타마스크에서 지원하지 않는다.
// 메타마스크를 확장프로그램으로 사용할 경우 메타마스크를 사용할 수 있다.

if (window.ethereum) {
  const isConnected = window.ethereum.isConnected();
  console.log("javascript 읽자 마자 isConnected :", isConnected);

  const getBalance = async (accounts) => {
    nowAccountElem.innerHTML = accounts[0];
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: accounts,
      // params: ["0xB9B142a69aADF49fC6192dfC0200DD82De2ff49f"],
    });
    balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
    console.log("잔액 :", parseInt(balance) / Math.pow(10, 18));
  };

  ethereum.on("connect", async (connectInfo) => {
    console.log(connectInfo);
    console.log(parseInt(connectInfo.chainId)); // {chainId: "0x539"}

    const isConnected = window.ethereum.isConnected();
    console.log("connect 후 isConnected :", isConnected);

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts", // metamask에서 eth_accounts를 eth_requestAccounts로 변환하여 받고 있다.
      });

      await getBalance(accounts);
      //   nowAccountElem.innerHTML = accounts[0];
      //   const balance = await ethereum.request({
      //     method: "eth_getBalance",
      //     params: accounts,
      //     // params: ["0xB9B142a69aADF49fC6192dfC0200DD82De2ff49f"],
      //   });
      //   balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
      //   console.log("잔액 :", parseInt(balance) / Math.pow(10, 18));
    } catch (error) {
      console.log(error);
    }
  });
  // 계정 변경
  ethereum.on("accountsChanged", async (accounts) => {
    console.log("계정 :", accounts);
    // metamask와 연결하면 지갑 계정을 가져온다
    // nowAccountElem.innerHTML = accounts[0];
    // const balance = await ethereum.request({
    //   method: "eth_getBalance",
    //   params: accounts,
    // });
    // balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
    // console.log("잔액 :", parseInt(balance) / Math.pow(10, 18));
    await getBalance(accounts);
  });

  ethereum.on("chainChanged", (chainId) => {
    console.log(chainId);
    // 0x1 -> 0x539
  });
  //   const sig = await web3.eth.personal.sign(n, address, "password!");

  document.getElementById("sendTransaction").onclick = () => {
    const from = nowAccountElem.innerHTML;
    const to = toElem.value;
    const value = "0x" + (+etherElem.value * Math.pow(10, 18)).toString(16);
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [{ from, to, value }],
      })
      .then((result) => {
        getBalance([from]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
