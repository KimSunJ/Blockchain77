// const Block = require("../block/block");
import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import TxOut from "@core/transaction/TxOut";
import UnspentTxOut from "@core/transaction/UnspentTxOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;

  private utxos: Array<IUnspentTxOut>;
  private txPool: Array<ITransaction>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`제네시스 블록 ${new Date()}`, 0)],
      []
    );

    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
    this.txPool = [];
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

  get getTxPool(): Array<ITransaction> {
    return [...this.txPool];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
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
      // if (global.debug) console.log(_newBlock);
      console.log(_newBlock);
      this.chain.push(_newBlock);
      _newBlock.data.forEach((_tx: Transaction) => this.updateUTXO(_tx));
      // 사용된 트랜잭션을 기준으로 utxo를 확인
      this.updateTxPool(_newBlock);
      // 다른 peer가 추가됐다고 보냈을 때 (새로운 블록 안의 utxo를 확인했으니 mine block에서 추가하는 것이 필요 없어짐)
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

    // 새로운 체인의 모든 블록을 가져다가
    this.chain.forEach((_block: IBlock) => {
      // 트랜잭션 풀을 업데이트하고, 삭제할것은 삭제, 추가할 것은 추가
      this.updateTxPool(_block);
      _block.data.forEach((_tx: Transaction) => {
        // 각 블록의 data(트랜잭션)을 하나하나 가져와서 UTXO를 업데이트한다.
        this.updateUTXO(_tx);
      });
    });

    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    const txOut: ITxOut = new TxOut(_address, 50); // _address, _amount
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // const utxo = coinbaseTransaction.createUTXO(); // 인터페이스로 추가해서 함수를 못가져온다.
    // this.utxos.push(...utxo);

    return this.addBlock([...this.getTxPool, coinbaseTransaction]);
  }

  updateUTXO(_tx: Transaction) {
    const utxos = this.getUtxo;
    const newUTXO: Array<IUnspentTxOut> = [];
    for (let i = 0; i < _tx.txOuts.length; ++i) {
      newUTXO.push(
        new UnspentTxOut(
          _tx.txOuts[i].address,
          _tx.txOuts[i].amount,
          _tx.hash,
          i // index
        )
      );
    }

    let temp = utxos.filter((item) => {
      const txIn = _tx.txIns.find(
        (item1) =>
          item.txOutId === item1.txOutId && item.txOutIndex === item1.txOutIndex
        // transaction 만든 곳에 Ins로 들어간 것을 찾는 구문
        // transaction의 txIns에 들어갔다 => input으로 넣어서 사용했다.
        // 그럼 기존의 utxo에서 사용한 utxo들을 빼야한다.
        // 그래서 txIns와 utxos를 비교, 검색하여 나오면 filter에서 걸러진다.
      );
      return !txIn;
    });
    // let temp = [];
    // for(let i =0; i < utxos.length; ++i){
    //   for(let j =0; j < _tx.txIns.length; ++j){
    //      if(
    //      !(utxos[i].txOutId !== _tx.txIns[j].txOutId &&
    //        utxos[i].txOutIndex !== _tx.txIns[j].txOutIndex)){
    //  temp.push(utxos[i]);
    // }
    // }
    // if (global.debug)
    //   console.log("6-36 수정된 utxo에 새로운 utxo를 추가해서 정의");
    const result = [...temp, ...newUTXO];

    this.utxos = result.reduce((prev, curr) => {
      const find = prev.find(
        ({ txOutId, txOutIndex }) =>
          txOutId === curr.txOutId && txOutIndex === curr.txOutIndex
      );
      if (!find) prev.push(curr);
      return prev;
    }, []);
  }

  addTxPool(_tx: Transaction): void {
    this.txPool.push(_tx);
  }

  updateTxPool(_newBlock: IBlock): void {
    // 블록 생성 후 해당 블록에 사용된 트랜잭션을 삭제한다.
    let txPool: Array<ITransaction> = this.getTxPool; // 기존 트랜잭션 풀(트랜잭션 풀 : 확인되지 않은 모든 트랜잭션을 포함하는 곳)
    const tempTx: Array<ITransaction> = _newBlock.data; // 새로운 블록의 트랜잭션 << 사용된 트랜잭션
    for (let i = 0; i < tempTx.length; ++i) {
      const tempTxPool: Array<ITransaction> = [];
      for (let j = 0; j < txPool.length; ++j) {
        if (txPool[j].hash !== tempTx[i].hash) tempTxPool.push(txPool[j]);
        // 기존 트랜잭션 풀과 사용된 트랜잭션들(블록 내의 트랜잭션)을 비교해서 사용되지 않은 트랜잭션을 새로운 배열에 넣어준다.
      }
      txPool = tempTxPool;

      // txPool = txPool.filter((_tx) => _tx.hash !== tempTx[i].hash); >>이중 for문 대체 가능한 구문
    }
    this.txPool = txPool;
  }
}

export default Chain;
