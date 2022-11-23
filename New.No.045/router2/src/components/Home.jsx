import { useLocation } from "react-router-dom";

function Home({ propsNum }) {
  console.log(useLocation().state);
  // state props를 이용하여 데이터를 전달할 수 있다.
  return <div>Home!!! {propsNum}</div>;
}

export default Home;
