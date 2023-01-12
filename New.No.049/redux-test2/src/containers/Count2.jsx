import Count2Comp from "../components/Count2";

import { connect } from "react-redux";
import { action } from "../modules/count2";

const Count2Container = ({ count2, plus, minus, input, test }) => {
  console.log(test);
  return <Count2Comp count2={count2} plus={plus} minus={minus} input={input} />;
};

const mapStateToProps = (state, props) => {
  console.log(props);
  return { count2: state.count2, ...props };
  // 객체 내의 값이 그대로 props로 전달된다.
};

const mapDispatchToProps = (dispatch) => {
  return {
    plus: () => {
      dispatch(action.plus);
    },
    minus: () => {
      dispatch(action.minus);
    },
    input: (input) => {
      dispatch(action.input(input));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count2Container);
// connect는 매개변수로 mapStateToProps 콜백함수 또는 mapStateToProps 콜백함수와 mapDispatchToProps 콜백함수를 받는다. (콜백함수를 하나만 넣을 수도 있고, 두개를 넣을수도 있다. 순서가 중요하기 때문에 나중에 받은 콜백함수를 받으려면 둘다 넣어야한다.)
// mapStateToProps 콜백함수와 mapDispatchToProps 콜백함수의 return 값은 객체로 내보낸다.
// mapStateToProps 콜백함수의 매개변수로는 state와 props를 받는다.
//    - state는 store(redux)의 state이다.
//    - props는 상위 컴포넌트에서 전달한 props이다. (현재 상태에선 App.js의 props)
// mapDispatchToProps 콜백함수의 매개변수로는 dispatch를 받는다.
//    - dispatch는 store의 dispatch 메서드이다.
// connect의 매개변수인 두 콜백함수의 return 값인 객체는 객체 내의 각각의 프로퍼티가 (Count2Container)를 매개변수로 받는 함수
// (mapStateToProps, mapDispatchToProps) 콜백함수들을 합쳐서 Count2Container에 props로 전달한다.
// (mapStateToProps, mapDispatchToProps) 순서가 중요함
// state만 보내고 싶으면 mapDispatchToProps을 매개변수에서 삭제하면 된다.
