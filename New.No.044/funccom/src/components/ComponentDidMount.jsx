import { useState, useEffect } from "react";

function ComponentDidMount() {
  const [num, setNum] = useState(0);
  useEffect(() => {
    console.log("hello");
  }, []);

  useEffect(() => {
    // 여기에 Mount 시에 실행할 코드를 적는다.
    setNum(num);
    console.log(`hi ${num}`);
  }, [num]);

  const increase = () => {
    setNum(num + 1);
  };
  return <div onClick={increase}>{num + 1}</div>;
}
export default ComponentDidMount;
