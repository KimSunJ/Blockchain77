import Count1Container from "./containers/Count1";
import Count2Container from "./containers/Count2";

function App() {
  return (
    <div>
      <Count1Container />
      <Count2Container test={"1"} />
    </div>
  );
}

export default App;
