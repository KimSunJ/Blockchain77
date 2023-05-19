const Block = require("../block/block");

class Chain {
  // 체인은 배열로 만들 것
  #chain;
  // 아무 데이터, 정보 등등을 체인에 넣지 못하도록 외부에서 접근을 막기 위해 private로 설정
  // 난이도를 통해서 문제(퀴즈)를 풀게 되고, 문제 해결된 블록을 체인에 추가하게 된다. <= 문제 풀이 과정을 마이닝이라고 한다.
  // 문제 풀이를 하는 이유? 블록의 생성 시간을 조절하기 위해서
  // 결국 난이도는 블록의 생성 시간을 조절하기 위해서 높아졌다가 낮아졌다가 하게 된다.
  // 난이도 조절에 대한 조건들을 설정하자
  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10; // 난이도 조절을 결정하는 블록의 개수(난이도 조절 단위 개수) > 블록이 10개 생성될 때마다 난이도 조절(재정의)
  #BLOCK_GENERATION_INTERVAL = 10; // 블록 10개당(1세대) 생성에 걸리는 시간(블록 당 생성 시간) / 10개는 위에서 설정한 수
  #TIME_UNIT = 60 * 1000; // 시간의 기본 단위 설정 / 60s * 1000ms => 1m(1분)

  // 대문자 변수명 지정 이유 : 얘는 상수이다. 즉, 앞으로 절대 변하지 않는 수이기 때문에 상수라고 무조건적으로 모두 대문자로 적을 필요는 없지만,
  // 일반적으로 사용하는 관례일 뿐이다. / 코드 상에서 재정의하지 않겠다는 의미

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    console.log(new Date());
    this.#chain.push(genesis);
  }

  get chain() {
    return [...this.#chain];
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }

  get config() {
    // 난이도 조절 관련 설정들을 한번에 가져가서 사용할 수 있도록 묶자,
    return {
      difficultyAdjustmentInterval: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      // 10개 블록 생성되는 시간
    };
  }

  get adjustmentBlock() {
    const length = this.#chain.length;
    // 현재 체인의 길이
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // 난이도 조절 단위 개수 전 index
    if (interval < 0) return this.#chain[0]; // 음수의 블록은 제네시스 블록을 내보내라
    // 1 index에 블록이 추가됐다. => 1이 추가되기 전에 체인의 길이는 1
    return this.#chain[interval]; // 그게 아니라면 구해진 인덱스 블록을 내보내라
    // 현재 설정 기준
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    // 제네시스 블럭 후 9개의 블럭이 추가됐다. << 0 / 체인의 길이가 10이다.
    // 10이 추가될 때 난이도를 수정하게 된다. << 1 / 0 index의 블록과 비교해야 한다. << 10 - 10
    // 10, 11, ..., 19 << 1
    // 20이 추가될 때 10 index의 블럭과 비교해서 난이도를 조절
  }

  addBlock(_data) {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }
}

const chain = new Chain();
// test block 32EA add
for (let i = 0; i < 32; i++) {
  chain.addBlock([`test block ${i}`]);
}

console.log(chain.chain);

module.exports = Chain;
