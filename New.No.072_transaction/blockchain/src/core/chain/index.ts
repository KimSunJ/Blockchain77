// const Block = require("../block/block");
import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import TxOut from "@core/transaction/TxOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;

  private utxos: Array<IUnspentTxOut>;

  constructor() {
    this.chain = [];
    const genesis: IBlock = new Block([`제네시스 블록 ${new Date()}`]);
    this.chain.push(genesis);

    this.utxos = [];
  }

  get getChain(): Array<IBlock> {
    return [...this.chain];
  }

  get lastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.BLOCK_GENERATION_INTERVAL * this.TIME_UNIT,
    };
  }

  get adjustmentBlock(): IBlock {
    const length: number = this.chain.length;
    const interval: number = length - this.DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.chain[0];
    return this.chain[interval];
  }

  get getUtxo(): Array<IUnspentTxOut> {
    return [...this.utxos];
  }

  addBlock(_data: Array<string>): IBlock | null {
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log(_newBlock);
      this.chain.push(_newBlock);
      return _newBlock;
    }
  }

  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 다른 서버에서 체인 받았을 때 정상적인 체인인지 확인하자.
    for (let i = 1; i < _chain.length; ++i) {
      // 첫번째 인덱스의 블록부터 마지막 블록까지 확인
      const nowBlock = _chain[i];
      const previousBlock = _chain[i - 1];
      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      if (isValid.isError == true) return isValid; // 문제가 생겼을 때 문제를 반환한다 / switch문에서 멈추게 하기 위해 (p2p/index.ts 81번째줄 코드 실행 위해서)
    }
    return { isError: false, value: undefined };
    // 문제가 없는 체인임이 확인됐다. (정상적 체인 확인 >> isError)
  }

  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    const newLastBlock = _chain[_chain.length - 1];
    const lastBlock = this.lastBlock;
    // 문제가 없다고 생각했을 경우 chain 추가
    if (newLastBlock.height === 0 && lastBlock.height !== 0) {
      // 상대방이 보낸 블록이 제네시스 블록이고, 내 체인에 있을 경우
      return { isError: true, msg: "받은 블록이 제네시스 블록이다." };
    }
    // 롱기스트 체인 룰
    if (newLastBlock.height < lastBlock.height) {
      return { isError: true, msg: "내 체인이 더 길다" };
      // 길기 때문에 내 것을 바꿀 필요가 없다.
    }
    if (newLastBlock.hash === lastBlock.hash) {
      // 상대방의 해시와 내 블록의 해시가 같다면 동기화 완료를 내보낸다.
      return { isError: true, msg: "동기화 완료" };
    }

    this.chain = _chain;
    // 가장 긴 체인이 내 체인이 된다
    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    const txOut: ITxOut = new TxOut(_address, 50); // _address, _amount
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    const utxo = coinbaseTransaction.createUTXO(); // 인터페이스로 추가해서 함수를 못가져온다.
    this.utxos.push(...utxo);

    return this.addBlock([JSON.stringify(coinbaseTransaction)]);
  }
}

export default Chain;
