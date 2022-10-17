function* what() {
  // function*은 generator 선언문
  // generator는 yield를 사용해서 함수를 중간에 멈추는 함수이다.
  try {
    // try는 코드를 실행하되, 문제가 있을 경우 catch로 전달한다.
    // 즉, 문제가 발생할지도 모르는 코드를 사용할 경우 사용한다.
    // 서버에 요청 시에 가장 많이 사용한다. -> 서버에 정상적으로 돌아간다는 보장이 없다. / 서버에 문제가 생길 경우 catch로 보낸다.
    for (let i = 0; i < 10; ++i) {
      console.log(i);
      yield i;
      // 함수 호출 시 여기서 멈춘다. >> 함수에 대해서 임시멈춤을 해준다.
      // 재호출 시 여기서 시작한다.
    }
  } catch (err) {
    // try 코드 실행 시 문제가 발생하면 해당 문제를 err 매개변수로 받아 실행한다.
    console.log(err);
  }
}

let generator = what();
generator.next();

// while (!generator.done) {
// done 프로퍼티는 generator가 끝났는가? 에 대한 boolean값을 준다.
//   generator.next();
// next 메서드는 코드를 실행한다.(단, yield에서 멈춘다.) -> 계속 돌리기 위함
// }
// 실행 구문
