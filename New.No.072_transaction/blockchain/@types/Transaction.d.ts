declare interface ITxOut {
  // transaction의 결과(output)
  address: string;
  amount: number;
}

declare interface ITxIn {
  // transaction에서 사용되는 잔액(input)
  txOutId: string; // transaction의 hash값
  txOutIndex: number; // transaction의 몇번째 output인가?
  signature?: string;
  // signature: string | undefined; >> undefined가 아닌 null이면 오류
  // - undefined는 값이 정의되지 않은 빈값
  // - null은 값이 비어있다고 정의된 값
  // | 는 비트연산자 중 or를 뜻한다.
  //   - 연산에 있어서 2진수로 바꿔서 연산한다.
  //   - 1011101 | 11011011
  //    - 01011101 | 11011011 => 결과 11011111 값이 나온다.
  //   - 12341 || 124124 << 둘 중 하나가 참이면 전체가 참이다.
}

declare interface ITransaction {
  txIns: Array<ITxIn>; // 인증
  txOuts: Array<ITxOut>;
  hash: string; // TxHash || TxId
}

declare interface IUnspentTxOut {
  address: string;
  amount: number; // transaction의 hash값
  txOutId: string; // transaction의 몇번째 output인가?
  txOutIndex: number;
}
