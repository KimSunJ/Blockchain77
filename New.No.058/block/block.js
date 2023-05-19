const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  #version;
  #merkleRoot;
  #timestamp;
  #height;
  #difficulty;
  #nonce;

  constructor(_data, _previousBlock) {
    this.#version = "1.0.0";
    this.#merkleRoot = _data
      ? merkle("sha256").sync(_data).root()
      : "0".repeat(64); // 제네시스 블록
    this.setTimestamp(); // 호출만 해도 timestamp와 연결해줌 (함수 안에서 this.#timestamp로 정의해줬기 때문에)
    // 이후에 체인에 블록을 연결하는 시점으로 블록 생성 시간을 정의하기 위해서 메서드를 만들었다.
    // Date << 클래스, now << static으로 정의된 method
    this.#height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.#difficulty = 0;
    this.#nonce = 0;
  }

  get version() {
    return this.#version;
  }
  get merkleRoot() {
    return this.#merkleRoot;
  }
  get timestamp() {
    return this.#timestamp;
  }
  get height() {
    return this.#height;
  }
  get difficulty() {
    return this.#difficulty;
  }
  get nonce() {
    return this.#nonce;
  }
  setTimestamp() {
    // set 메서드가 아닌 setTimestamp 메서드를 정의한 것
    this.#timestamp = Date.now();
  }
}

class Block extends BlockHeader {
  #previousHash;
  #hash;
  #data;

  constructor(_data, _previousBlock) {
    super(_data, _previousBlock); // _data를 부모에게 전달
    // super는 부모 클래스의 constructor를 실행한다.
    this.#previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    this.#hash =
      _data && _previousBlock ? Block.createHash(this) : "0".repeat(64);
    // block의 id같은 역할
    this.#data = _data; // 매개변수에 전달
  }

  get previousHash() {
    return this.#previousHash;
  }
  get hash() {
    return this.#hash;
  }
  get data() {
    return this.#data;
  }

  static createHash(_block) {
    // _block >> Block.createHash(this)으로 얻는다.
    let tempStr = "";
    // 블록의 정보를 임시로 합칠 string
    _block.setTimestamp();
    // 이 과정이 끝나면 블록끼리 연결하게 된다.

    tempStr += _block.version;
    tempStr += _block.merkleRoot;
    tempStr += _block.timestamp;
    tempStr += _block.height;
    tempStr += _block.difficulty;
    tempStr += _block.nonce;
    tempStr += _block.previousHash;
    // hash는 현재 만들고 있는 키이기에 추가하지 않는다.
    // data는 merkleRoot로 합쳐져 있기 때문에 merkleRoot로 대체한다.
    return SHA256(tempStr).toString().toUpperCase();
  }
}

const temp = new Block(["a"]);
console.log(temp);
Block.createHash(temp);

module.exports = Block;
