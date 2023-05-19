import { useEffect } from "react";

export default function ComponentDidUpdate() {
  useEffect(() => {
    // 여기에는 업데이트 때마다 실행되는 코드를 작성한다. => 랜더링
    console.log("요거");
  });
  console.log("저거");
  // '이거'랑 '저거'랑 차이가 없다.
  return <div></div>;
}
