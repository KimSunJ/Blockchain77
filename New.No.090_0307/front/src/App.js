import "./App.css";
import useWeb3 from "./useWeb3";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [web3, account] = useWeb3();
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "candidates",
      });
      setCandidateList(result.data.candidates);
    })();
  }, []);

  return (
    <div className="App">
      <h1>오점뭐?</h1>
      <div className="vote-list">
        {candidateList.map((item, idx) => (
          <Candidate
            key={`candidate-${idx}`}
            item={item}
            web3={web3}
            account={account}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

const Candidate = ({ item, account, web3 }) => {
  const [vote, setVote] = useState(0);
  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "totalVotesFor",
        item,
      });
      setVote(result.data.vote);
      // 투표 수 바로 적용
      if (web3)
        web3.eth
          .subscribe("logs", { address: result.data.CA })
          .on("data", (log) => {
            const params = [
              { type: "string", name: "candidate" },
              { type: "uint", name: "votes" },
            ];
            const value = web3.eth.abi.decodeLog(params, log.data);
            // console.log(value);
            if (value.candidate == item) {
              console.log("투표됨");
              setVote(value.votes);
            }
          });
    })();
  }, [web3]);

  const onClick = async () => {
    const result = await axios.post("http://localhost:8080/api/send", {
      method: "voteForCandidate",
      candidate: item,
      from: account,
    });
    web3.eth.sendTransaction(result.data);
    // back에서 트랜잭션에 대한 것을 받고 front로 전달 받는 것(metamask -> back -> front)
  };

  return (
    <div className="vote-item" onClick={onClick}>
      <h3>{item}</h3>
      <div>{vote}</div>
    </div>
  );
};
