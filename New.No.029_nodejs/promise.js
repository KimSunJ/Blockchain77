function testFunc(num, time, func) {
  setTimeout(() => {
    console.log(num);
    func(num);
  }, time);
}

// setTimeout(() => {
//   console.log(1);
// }, 1000);
// setTimeout(() => {
//   console.log(2);
// }, 1000);
// setTimeout(() => {
//   console.log(3);
// }, 1000);

// testFunc(1, 1000, () => {
//   testFunc(2, 2000, () => {
//     testFunc(3, 3000, () => {
//       testFunc(4, 4000);
//     });
//   });
// });
// -> 위의 방식이 불편하여 나온 것이 promise라는 것

function testPromise(num) {
  return new Promise((resolve, reject) => {
    // resolve는 완료 했을 때
    // reject는 에러 발생 시
    try {
      if (num > 10) reject({ data: "숫자가 너무 커" });
      // result에서 객체가 그대로 뜬다.
      console.log(num);
      setTimeout(() => {
        resolve(num + 1);
      }, num * 100);
    } catch (error) {
      reject(error);
    }
  });
}
// testPromise(1)
//   .then((data) => {
//     return testPromise(data);
//   })
//   .then((data) => {
//     return testPromise(data);
//   })
//   .then((data) => {
// then : 완료했을 때
// 34번째 줄의 resolve의 매개변수(num+1)가 data에 정의된다.
// console.log("data: " + data);
//   })
//   .catch((err) => {
// catch: 에러 발생 시
// 31번줄, 37번 줄의 reject 매개변수가 err에 정의된다.
// console.log(err);
//   });
// 파일이 불러오기까지 오래 걸릴때 promise가 들어가 있는 애를 사용하기도 한다. 돌아가는 방식을 사용할 예정
// promise는 연속적으로 불러온다.

async function asyncFunc() {
  // 동기와 비동기 구조를 연결해주는 함수
  // async : Promise를 기다리기 위해서 (동기처럼 사용하기 위해서) 사용한다.
  try {
    let temp = await testPromise(1);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    // const temp = await testPromise(1);
    // await + promise : promise를 기다려서 resolve값을 반환받는다.
    console.log("temp: " + temp);
    // [].map().join()
    // '',split().map().join()
  } catch (err) {
    console.log(err);
  }
}
asyncFunc();
