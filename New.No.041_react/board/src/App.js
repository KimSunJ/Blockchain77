import "./App.css";
import TempTable from "./components/TempTable";

function App() {
  const tempArr = [
    { name: "홍길동", age: 17, number: "1", work: "Front" },
    { name: "짱구", age: 1, number: "2", work: "Front" },
    { name: "신형만", age: 45, number: "3", work: "Back" },
    { name: "짱아", age: 2, number: "4", work: "Back" },
    { name: "신미선", age: 10, number: "5", work: "Front" },
    { name: "흰둥이", age: 3, number: "6", work: "Back" },
  ];
  const headData = {
    name: "이름",
    age: "나이",
    number: "번호",
    work: "필살기",
  };
  const tempHead = ["name", "age", "number", "work"];
  // string을 객체화해서 보내기 위해
  return (
    <div className="App">
      {/* <TempTable arr={tempArr} tableData={headData} head={tempHead} /> */}
      <TempTable tempArr={tempArr} headData={headData} tempHead={tempHead} />
    </div>
  );
}

export default App;
