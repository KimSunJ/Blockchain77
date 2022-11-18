import { Children, useState } from "react";

export default function ({ test1, children }) {
  const [count1, setCount1] = useState(0);
  // [count1, setCount1] >> 구조분해할당 (배열도 가능하다)
  // [{count1}, {setCount1}] >> 객체 구조분해할당
  // setCount1에게 useState가 할당해준다.
  // 구조분해할당은 대부분 const를 사용한다.
  // props다, 나중에 다시 설명
  // props는 상위 컴포넌트에서 설정된 값이다.
  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div style={{ fontSize: "30px", backgroundColor: "red", color: "white" }}>
        {test1}
        {children}
      </div>
      <ul>
        {tempArr.map((item, index) => {
          return <li key={`test-${index}`}>{item}</li>;
          //   return <li key={index}>{item}</li>;
        })}
        {/* html문법을 넣을때는 key를 넣는다 id와 같은 존재 */}
      </ul>
      <button
        onClick={function () {
          setCount1(count1 + 1);
          console.log(count1);
          // count1++ 에러 됨
        }}
      >
        {count1}
      </button>
    </>
    // 빈 태그가 가능하다
  );
  // HTML 태그의 형제 방식으로 return 하지 못한다. << 하나로 구조를 묶어서 return 해야한다.
  // HTML 문법 내에 Javascript 변수 / 함수 등등을 사용할 경우 {}로 묶어준다.
}

// 사전적 의미: Component란 여러 개의 함수들을 모아 하나의 특정한 기능을 수행할 수 있도록 구성한 작은 기능적 단위
// React는 View를 위한 라이브러리 >> Front End에 보여주기 위한 라이브러리 >> 랜더링이 주된 기능 >> 기능은 div 등등의 Element 구조로 많이 나뉘어진다.
// export default function Test({ test }) { >> 이렇게 이름을 넣어줘도 상관 없다.
