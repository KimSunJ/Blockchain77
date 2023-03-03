import { useState, useEffect } from "react";
import CounterContract from "./contracts/Counter.json";
import axios from "axios";
// import { txObj } from "../../back/index";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();
  const [send, setSend] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;
      // const _deployed = new web3.eth.Contract(
      //   CounterContract.abi,
      //   "0x9695AE6B5ae9DB1cC61809a0f4EeADcdA32248B6"
      //   // CA 넣어주고,
      // );
      // 0303
      const networkId = await web3.eth.net.getId();
      const CA = CounterContract.networks[networkId].address;
      const abi = CounterContract.abi;
      const _deployed = new web3.eth.Contract(abi, CA);
      setDeployed(_deployed);

      const _count = await _deployed.methods.getCount().call();
      setCount(parseInt(_count));
      // 0303
      // subscribe 안 logs와 on 안의 "data"는 정해져 있는 구문이다.
      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        // subscribe 메서드를 사용해서 블록체인 네트워크에 구독, 이벤트명은 logs이다.
        // Solidity에서 event 이벤트명(로그를 남길 데이터/변수)를 선언하고 로그를 남길 순간에 emit으로 구독한 서버에 알린다.
        // emit으로 전달될 데이터는 log.data에 들어있다.
        // subscribe의 두번째 매개변수에 옵션을 추가할 수 있으며 address 옵션은 해당 주소에 대해서만 logs를 받는다.
        // 변경한 내용에 대해서 socket 통신으로 받아오기 때문에 바로 적용이 된다.
        console.log(log);

        const params = [{ type: "int256", name: "count" }];
        // params는 Solidity에서 log로 받아오는 데이터에 대한 타입과 변수명
        const value = web3.eth.abi.decodeLog(params, log.data);
        console.log(value);
        setCount(value.count);
      });
    })();
  }, []);

  const increment = async () => {
    // const result = await deployed.methods.increment().send({ from: account });
    // if (!result) return;
    // const _count = await deployed.methods.getCount().call();
    // setCount(parseInt(_count));
    // 0303
    const data = (
      await axios.post("http://localhost:8080/api/increment", {
        from: account,
      })
    ).data;
    console.log(data);
    await web3.eth.sendTransaction(data);
    // const result = await txObj;
    // console.log(result);
  };

  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });
    // if (!result) return;
    // const _count = await deployed.methods.getCount().call();
    // setCount(parseInt(_count));
  };
  return (
    <div>
      <h2>Count : {count}</h2>
      <button
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          decrement();
        }}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
