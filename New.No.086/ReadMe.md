# Javascript에서 Solidity 컴파일 및 스마트 컨트랙트 실행

```sh
# 필요 라이브러리
npm i solc web3
```

- 코드 설명

```js
const solc = require("solc");
// 솔리디티 코드를 바이트코드로 변환시켜주는 컴파일 라이브러리
const fs = require("fs");
// FileSystem, 파일에 접근하여 데이터를 가져오거나 파일을 수정, 생성 등의 기능을 제공하는 라이브러리
const path = require("path");
// 경로에 대한 편의 기능을 제공하는 라이브러리
// 사용 이유는 보통 OS에 따른 경로 문자열이 다르기 때문에
//   - Windows OS : c:\Users\kga-00\Documents\GitHub\blockchain7
//   - Linux OS : /mnt/c/Users/kga-00
const contractPath = path.join(__dirname, "contracts", "Test.sol");
// __dirname : 현재 문서의 경로 (폴더까지만)
//      - PS : ES6(import, export) 사용 시 __dirname이 없다.
// path.join : 경로를 합쳐서 하나의 문자열로 반환

const data = JSON.stringify({
  // solc를 사용하여 Solidity 코드를 컴파일 시 사용할 설정
  language: "Solidity",
  // 언어 설정을 Solidity로 설정, 다른 언어(yul)도 있으나, 거의 사용하지 않음
  sources: {
    // 파일에 대한 설정
    "Test.sol": {
      // 파일로 생성되는 솔리디티 객체의 이름
      content: fs.readFileSync(contractPath, "utf-8"),
      // 파일 내용(코드)
      //  파생되는 내용들이 많다.
    },
  },
  settings: {
    // 추가적인 설정
    outputSelection: {
      // 가져올 정보 설정
      "*": {
        // 파일 이름
        "*": ["*"],
        // 가져올 데이터의 키, 값
      },
      //  * : 모든 것
      // outputSelection 내용은 '모든 데이터를 전부 가져와라'
    },
  },
});

const compiled = JSON.parse(solc.compile(data));
// 컴파일 후 데이터를 객체화
const abi = compiled.contracts["Test.sol"].Test.abi;
// ABI 추출
const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;
// ByteCode 추출
```

---

# Geth에서 생성한 지갑 계정 개인키 가져오기

```sh
# 필요 라이브러리
npm i keythereum
```

```js
const keyObj = keythereum.importFromFile(address, __dirname);
// 매개변수로 가져올 지갑 주소와 해당 지갑 주소에 대한 key 파일이 있는 keystore가 있는 폴더의 위치(/Users/ksj/Documents/GitHub/Blockchain77/New.No.086/keystore)를 전달한다.
// 파일명에 지갑주소가 있기 때문에 그것을 통해 찾는다.
const privateKey = keythereum.recover("Password", keyObj);
// 매개변수로 비밀번호와 key 객체를 전달한다.
// 개인키에 대한 객체를 반환받는다.
```
