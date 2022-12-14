// 리덕스 기본 방식
// const TYPE = {
//   INCREMENT: "counter/increment",
//   DECREMENT: "counter/decrement",
// };

// const increment = () => ({
//   type: TYPE.INCREMENT,
// });

// const decrement = () => ({
//   type: TYPE.DECREMENT,
// });

// export const action = { increment, decrement };

// export const initialize = 0;

// export const reducer = (state = initialize, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case TYPE.INCREMENT:
//       return state + 1;
//     case TYPE.DECREMENT:
//       return state - 1;
//     default:
//       return state;
//   }
// };

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const promiseTime = (count) => {
  return new Promise((resolve, reject) => {
    try {
      //   reject(0);
      setTimeout(() => {
        resolve(count);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

export const counterThunk = createAsyncThunk(
  "count/countThunk", // 첫번째 매개변수로 type의 이름을 설정한다.
  async (count) => {
    // 두번째 매개변수로 reducer를 설정한다.
    return await promiseTime(count);
  }
);

const counterSlice = createSlice({
  // createSlice로 actions, reducers 등등을 전부 한번에 생성한다.
  name: "count", // action 이름, action의 type에 'action명/reducer명'으로 표기된다.
  initialState: { value: 0, isLoading: false }, // 초기값, 객체로만 가능.
  reducers: {
    // reducer를 만든다.
    increment: (state) => {
      state.value += 1; // 기존의 redux에서의 순수함수와는 달리 value를 직접 수정하는 방법도 가능하다.
      // action.increment = () => { type:'count/increment' }
    },
    decrement: (state) => {
      state.value += 1;
    },
    input: (state, action) => {
      state.value = action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(counterThunk.pending, (state, action) => {
        // pending은 작업 시작 직전에 실행된다.
        state.isLoading = true; // 시작이니까 로딩이 되어야하니까
      })
      .addCase(counterThunk.fulfilled, (state, action) => {
        // builder의 addCase 메서드를 사용해서 각 작업에 대해서 내용을 작성한다.
        // pending은 실행이 언제 시작됐는지 뜨는 것
        // fulfilled의 경우 reducer(counterThunk)가 성공적으로 완료되었을 시에 실행하는 작업이다.
        state.value = action.payload;
        state.isLoading = false; // 시작했을때 로딩을 시작했으니, 끝날때 false
      })
      .addCase(counterThunk.rejected, (state, action) => {
        // 작업 실패 시 실행된다.
        state.isLoading = false; // 실패했어도 로딩이 끝났으니
        // state.value = 0;
      });
  },
});
// console.log(counterSlice);
export const action = counterSlice.actions;
// createSlice는 action을 자동으로 만들어준다.(action 함수)
// createSlice로 생성된 actions를 dispatch(action)으로 사용한다.

export const reducer = counterSlice.reducer;
// store에 reducer으로 createSlice로 생성된 reducer를 사용한다.
