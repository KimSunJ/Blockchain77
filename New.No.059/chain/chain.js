const Block = require("../block/block");

class Chain {
  // 체인은 배열로 만들 것
  #chain;
  // 아무 데이터, 정보 등등을 체인에 넣지 못하도록 외부에서 접근을 막기 위해 private로 설정
  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    console.log(new Date());
    this.#chain.push(genesis);
  }

  get chain() {
    return [...this.#chain];
    // 외부에서 #chain 접근 시 새로운 배열을 만들어서 준다(반환한다)
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }

  addBlock(_data) {
    const newBlock = new Block(_data, this.lastBlock);
    // ex) 제네시스 블록만 있을 때 체인의 길이는? 1 [제네시스 블록]
    //  - 제네시스 블록의 인덱스는? 0
    //  - 마지막 블록의 인덱스는 0 < 길이가 1일 때 0을 구해야한다.
    // 블록 하나를 추가했다. [제네시스 블록, 하나 추가]
    //  - 체인의 길이 : 2
    //  - 제네시스 블록의 인덱스는? 0
    //  - 제네시스 블록의 다음 블록의 인덱스는? 1
    //  - 제네시스 블록의 다음 블록의 다음 블록의 인덱스는? x << 터짐
    //  - 마지막 블록의 인덱스는 1 < 길이가 2일 때 1을 구해야한다.
    // 블록 하나 더 추가 [제네시스 블록, 하나 추가, 하나 더 추가]
    //  - 체인의 길이 : 2
    //  - 제네시스 블록의 인덱스는? 0
    //  - 제네시스 블록의 다음 블록의 인덱스는? 1
    //  - 제네시스 블록의 다음 블록의 다음 블록의 인덱스는? 2
    //  - 마지막 블록의 인덱스는 2 < 길이가 3일 때 2를 구해야한다.
    // const isValid = Block.isValidBlock(newBlock, this.lastBlock);
    // if (isValid.isError) {
    //   console.error(isValid.msg);
    //   return null;
    // } else {
    //   this.#chain.push(newBlock);
    //   return newBlock;
    // }
    // chain = [1,2,3] => 4번 블록을 추가한다.
    // 4번 블록은 3번 블록을 알고 있어야한다. (previoushHash)
    // chain 기준으로 2번 인덱스의 블록 => chain의 길이에서 1을 빼면 마지막 인덱스가 나온다.
    // => 마지막 인덱스에 해당하는 블록을 가져와서 사용한다.
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

// const chain = new Chain();
// // console.log(chain.chain);
// const block = new Block(["qwer"], chain.lastBlock);
// console.log("lastBlock : ", chain.lastBlock);
// console.log("block : ", block);
// block.height = 4;

// chain.addBlock(["asdf"]);
// chain.addBlock(["asdf2"]);
// chain.addBlock(["asdf3"]);

// chain.add2Chain(block);

// console.log(chain.chain);

module.exports = Chain;

// chain.chain.push({ data: "???" }); / 아무 데이터를 넣었을 경우를 check하기 위함
// console.log(chain.chain);

// const a = [];
// // a => 어떤 위치(memory)에 [] 이라는 값을 넣었다. 그 어떤 위치의 이름이 a다.
// const b = a;
// b.push("asdf");
// console.log(a);

// const a = {};
// const b = a;
// b.a = "asdf";
// console.log(a);
