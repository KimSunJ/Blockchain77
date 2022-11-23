import { useState, useEffect, useMemo, useCallback, useRef } from "react";

function EffectTest() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");
  const [file, setFile] = useState({
    name: "asdf",
    ext: "png",
    type: "image/png",
  });

  console.log("check");

  useEffect(() => {
    console.log("이펙트훅 테스트 시작");
  }, []);

  useEffect(() => {
    console.log(`숫자가 ${num}으로 변경됐으`);
    setName(`${num}`);
  }, [num]);

  useEffect(() => {
    console.log("이름이 " + name + " 으로 변경됐으");
    setFile({ ...file, name: name });
  }, [name]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const increase = () => {
    setNum(num + 1);
    // setName(name + "1");
  };
  const increaseCallback = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  // [] -> 시작할 때
  // 가입 => ID, PW, 이름, 나이, 성별, 지역
  //   - input 함수를 만들어서 연결
  //   - ID, PW, 이름, 나이, 성별, 지역 << 각각은 state
  //   - ID가 변경되었을 때 PW, 이름, 나이, 성별, 지역에 대한 함수는 선언되는가?
  //     => const changeId()=>{} << 해당 방법과 같이 Hook을 사용하지 않았을 경우 나머지 함수들도 전부 다시 선언된다.
  //   - 다시 선언하는 작업을 하지 않기 위해서 useCallback을 사용한다.
  //   - 최적화에 사용한다. << 최적화를 생각하지 않으면 쓸 필요가 없다.

  //   const tempNum = num + 10;
  const memoNum = useMemo(() => {
    return num + 10;
    // num이 바뀌었을 때만 실행되는 아이
  }, [num]);

  const ref = useRef();

  return (
    <div>
      <button onClick={increaseCallback}>{memoNum}</button>
      <div
        ref={ref}
        onClick={() => {
          console.log(ref.current);
        }}
      >
        {name}
      </div>
      <div>{file.name + "." + file.ext}</div>
    </div>
  );
}

export default EffectTest;
