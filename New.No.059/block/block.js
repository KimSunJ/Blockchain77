const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  height;
  difficulty;
  nonce;
  // private 키(ex)#version)로 정의(생성)할 경우 키들이 객체에서 보이지 않는다.
  // 후에 통신할 때 다른 처리를 하려했으나, 쉽게 가기 위해서 private를 취소하겠다.

  constructor(_data, _previousBlock) {
    this.version = "1.0.0";
    // this.merkleRoot = _data
    //   ? merkle("sha256").sync(_data).root()
    //   : "0".repeat(64);
    const merkleRoot = this.creatMerkleRoot(_data);
    // 머클루트 생성 메서드 호출
    if (merkleRoot.isError) {
      // 오류일 경우
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }

  setTimestamp() {
    this.timestamp = Date.now();
    // 밀리초(ms, 0.001s) 기준으로 실행된다.
  }
  creatMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      // Array.isArray 는 매개변수가 배열인지 확인한다.
      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
      //
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }
}

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock) {
    super(_data, _previousBlock);
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    // this.hash =
    //   _data && _previousBlock ? Block.createHash(this) : "0".repeat(64);
    if (this.merkleRoot) {
      // merkleRoot가 있음 << 정상적인 배열로된 데이터가 입력(전달)되었다.
      this.hash = Block.createHash(this);
    } else {
      // merkleRoot가 없음 << 배열이 아닌 데이터가 입력(전달)되었다.
      this.hash = "";
      // 이후 오류 발생 여부 확인용
    }
    this.data = _data;
  }

  static createHash(_block) {
    let tempStr = "";
    // _block.setTimestamp(); // 난이도 조절 설정 때문에 넣으려고 했던 것임

    // tempStr += _block.version;
    // tempStr += _block.merkleRoot;
    // tempStr += _block.timestamp;
    // tempStr += _block.height;
    // tempStr += _block.difficulty;
    // tempStr += _block.nonce;
    // tempStr += _block.previousHash;

    // hash는 현재 만들고 있는 키이기에 추가하지 않는다.
    // data는 merkleRoot로 합쳐져 있기 때문에 merkleRoot로 대체한다.
    const keys = Object.keys(_block);
    // Object.keys => 객체의 key들을 배열로 가져온다 (반환한다)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
        // for, while 같은 반복문에서 아래의 코드를 실행하지 않고 위로 올라간다.
        // i가 0일 때 continue 시 아래의 코드를 실행하지 않고 위로 올라가 i++ 부터 실행하게 된다. | 아래 코드를 건너뛴다.
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
  }

  static isValidBlock(_newBlock, _previousBlock) {
    // 생성된 블록이 정상인지 확인해보자
    if (_newBlock.height !== _previousBlock.height + 1) {
      return { isError: true, msg: "높이가 다르다" };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      return {
        isError: true,
        msg: "이전 블록의 hash와 새로운 블록의 이전 hash가 다르다",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      return { isError: true, msg: "hash 생성 중 오류 발생" };
    }
    return { isError: false, value: _newBlock };
  }
}

// 1-1
const temp = new Block();

console.log(temp);
Block.createHash(temp);

module.exports = Block;
