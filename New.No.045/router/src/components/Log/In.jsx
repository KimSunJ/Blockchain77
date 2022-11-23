import { useParams } from "react-router-dom";

function In() {
  const params = useParams();
  // 라우터에 정해진 라우터가 아니라 동적인 값이 들어왔을 때 받는 Hook이다.
  // Route에서는 '/:이름'이라고 구현한다.
  // /src/components/Log/index.jsx에서 useId라고 이름을 선언했으며, params.userId(변수)로 가져올 수 있다.
  // 'userId'와 같은 사용자가 지정해야만 알수 있는 것들은 params를 사용하여 구현한다.
  console.log(params);

  return <div>In!</div>;
}

export default In;

// const withParams = (Child) => {
//   return (props) => {
//     const params = useParams();
//     return <Child {...props} params={params} />;
//   };
// };

// export default withParams(In);
