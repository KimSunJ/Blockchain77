import "./App.css";

import Web3 from "web3";
import { useEffect } from "react";
import DogeTokenContract from "./DogeToken.json";

function App() {
  useEffect(() => {
    (async () => {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(DogeTokenContract.abi);
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const txObj = {
        data: DogeTokenContract.bytecode,
        arguments: ["DogeToken", "DG", 10000],
      };
      // 정보를 받아오기 전에 아래 구문이 실행되면 오류가 생긴다.
      const deployed = await contract.deploy(txObj).send({
        from: _account,
        gas: 20000000,
      });
      console.log(deployed.options.address);
    })();
  }, []);

  return <div className="App"></div>;
}

export default App;
