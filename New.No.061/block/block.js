const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;
const hexToBinary = require("hex-to-binary");

class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  height;
  difficulty;
  nonce;

  constructor(_data, _previousBlock) {
    this.version = "1.0.0";

    const merkleRoot = this.creatMerkleRoot(_data);
    if (merkleRoot.isError) {
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
  }
  creatMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }

  // 난이도 수정 함수
  getDifficulty({
    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 난이도 조절 단위 개수 이전의 블록의 난이도 (10개 생성 전 블록의 난이도)
    adjustmentTimestamp, // 생성시간(10개 생성 전 블록의 생성시간)
    difficultyAdjustmentInterval, // 난이도 조절 단위 개수
    averageGenerationTime, // 블록 세대당 생성 시간(블록 10개당 생성 시간)
  }) {
    if (this.height < difficultyAdjustmentInterval) {
      // 0~9까지는 조절 안하니 난이도가 0으로 설정된다는 의미
      this.difficulty = 0;
    } else if (this.height < difficultyAdjustmentInterval * 2) {
      // 20개 이전에는 제네시스 블록 생성 시 설정한 난이도보다 하나 더 높은 난이도가 설정된다.
      this.difficulty = 1;
    } else if (this.height % difficultyAdjustmentInterval !== 0) {
      // 높이가 난이도 조절 단위 개수에 맞지 않을 때 이전 블록의 난이도로 설정(정의)
      this.difficulty = previousDifficulty;
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;
      // 10개 전 블록과 현재 블록의 생성 시간 차이

      // console.log("블록 생성 시간 : ", this.timestamp);
      // console.log("10개 전 블록 생성 시간 : ", adjustmentTimestamp);
      // console.log("10개 전 블록과 현재 블록 생성 시간 차이 : ", timeToken);
      // console.log("10개당 블록 생성 시간 기준 : ", averageGenerationTime);

      if (timeToken < averageGenerationTime * 0.9) {
        // 이전 10개 생성 시간이 0.9초 보다 적게 걸렸을 경우,
        this.difficulty = adjustmentDifficulty + 1;
        // 난이도를 올려서 시간이 더 걸릴 수 있도록 조절한다.
      } else if (timeToken > averageGenerationTime * 1.1) {
        // 이전 10개 생성 시간이 1.1초 보다 많이 걸렸을 경우,
        this.difficulty = adjustmentDifficulty - 1;
        // 난이도를 낮춰서 시간이 덜 걸릴 수 있도록 조절한다.
      } else {
        this.difficulty = adjustmentDifficulty;
      }
    }
  }
}

class Block extends BlockHeader {
  previousHash;
  hash;
  data;
  // 블록 생성
  constructor(_data, _previousBlock, _adjustmentBlock, _config) {
    super(_data, _previousBlock);
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    if (this.merkleRoot) {
      if (_adjustmentBlock && _config) {
        // 제네시스 블록 생성 시 전달하지 않음으로 예외 처리
        // hash값 설정
        this.getDifficulty({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          difficultyAdjustmentInterval: _config.difficultyAdjustmentInterval,
          averageGenerationTime: _config.averageGenerationTime,
        });
      }
      this.hash = Block.createHash(this);

      if (_adjustmentBlock && _config) {
        // 문제가 풀어졌는지 확인하고 풀이가 될때까지 정보를 바꿀 것이기 때문에 업데이트를 한다.
        this.updateBlock({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          difficultyAdjustmentInterval: _config.difficultyAdjustmentInterval,
          averageGenerationTime: _config.averageGenerationTime,
        });
      }
    } else {
      this.hash = "";
    }
    this.data = _data;
    console.log("this: ", this);
  }

  static createHash(_block) {
    let tempStr = "";

    const keys = Object.keys(_block);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
  }

  // 0113 수업
  // 문제풀이함수
  updateBlock(difficultyOptions) {
    // 난이도와 논스를 사용해서 문제를 푼다.
    // 여기서의 문제는 difficulty 알고리즘이라고 한다.
    // difficulty 알고리즘
    //  - 2진수로 변화하여 앞의 0의 개수와 difficulty와 비교하여 difficulty보다 0의 개수가 많으면 문제를 해결한 것이다.
    //  - Block의 암호화된 hash는 64자의 16진수 수로 이루어져있다.
    //  - hash를 2진수로 바꾸고 2진수의 수의 제일 앞에서부터 연속되는 0의 개수가 difficulty보다 크면 해결한 것이고, 아니면 해결하지 못한 것으로 처리한다.
    //  - hash == AAAA => 1010 1010 1010 1010
    //        => difficulty가 0이면 "0"이 0개 있으면 해결이다. 즉, 현재는 해결이다.
    //        => difficulty가 1이면 "0"이 1개 있으면 해결이다. 즉, 현재는 해결하지 못했다.
    //  - hash == 1AAA => 0001 1010 1010 1010 (해결할 수 있는 난이도 (difficulty)가 3까지라는 것이고, 맨 앞자리를 판단하여 난이도가 1일때 이미 끝난다.)
    //        => difficulty가 0이면 "0"이 0개 있으면 해결이다. 즉, 현재는 해결이다.
    //        => difficulty가 1이면 "0"이 1개 있으면 해결이다. 즉, 현재는 해결이다.
    // 16진수 3 => 10진수 3 => 2진수 0011
    // 16진수 A => 10진수 10 => 2진수 1010
    // 16진수 F => 10진수 15 => 2진수 1111 (16진수의 최대값은 2진수에서 1111이 된다.)
    // difficulty == 1 => 2진수에서 0으로 시작해야 한다 => 16진수에서 8보다 작으면 된다. (7이 0111이기 때문에)
    // => 16진수의 8 = 2진수 1000 / 그보다 작은 0111, 즉, 7 이하의 수면 가능하다.
    // difficulty == 2 => hash의 첫 자리가 몇 이하면 될까? 3 이하면 된다.
    // 0011 => 3 => 16진수에서도 3

    let hashBinary = hexToBinary(this.hash);
    // 현재 hash를 2진수로 변환한다.
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // startsWith는 string의 메서드로 시작하는 문장(string)을 확인해준다.
      // 조건 : 난이도 만큼 0이 반복되는지
      this.nonce += 1;
      // hash가 변경될 수 있도록 nonce를 증가시킨다.
      // nonce값이 변하면 setTimestamp와 getDifficulty가 같아도 hash가 재작동한다.
      this.setTimestamp();
      // 블록 생성 시간은 chain에 추가되는 시간이기 때문에 문제풀이 시점을 생성시간으로 재설정(재정의)한다.
      this.getDifficulty(difficultyOptions);
      // 난이도가 기준에 미치지 못할 경우 재설정 / 시간이 다시 설정됐기 때문에 기준 시간과 비교하여 난이도를 재설정(재정의)한다.
      //  - difficultyOptions라는 변수로 넣은 이유 : updateBlock메서드 또한 매개변수로 해당 정보를 받아와야하기 때문
      this.hash = Block.createHash(this);
      // 변경된 값에 따라서 hash를 다시 설정하고,
      hashBinary = hexToBinary(this.hash);
      // 2진수로 바꾸어 while의 조건문(문제 조건)에 해당하지 않는지 확인한다.
      //  - while의 조건문이 부정이기 때문에 해당하지 않으면 문제 해결이다.
    }
    console.log("hashBinary :", hashBinary);
    console.log("hashBinary.slice :", hashBinary.slice(0, this.difficulty));
  }

  static isValidBlock(_newBlock, _previousBlock) {
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

const temp = new Block();

console.log(temp);
Block.createHash(temp);

module.exports = Block;
