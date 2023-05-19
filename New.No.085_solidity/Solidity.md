# EVM

- Ethereum Virtual Machine
- 스마트 컨트랙트를 실행하기 위한 가상 컴퓨터
- 블록체인 네트워크 노드(peer)에 포함되어 항상 실행
  - 노드(peer)끼리의 합의에 사용
  - ByteCode 실행에 사용

# Solidity

- 스마트 컨트랙트 프로그래밍 언어
- 컴파일하여 ByteCode를 생성
- ByteCode는 트랜잭션의 data로 저장되어 스마트 컨트랙트 실행 시 사용

# geth 새롭게 개인 네트워크 생성

```sh
sudo vi ./newGenesis.json
geth --datadir newGeth init newGenesis.json
```

```json
{
  "difficulty": "200000",
  "gasLimit": "3100000",
  "alloc": {},
  "config": {
    "chainId": 50, # 수업상 수정
    # 우리만의 아이디로 같은 peer를 찾기 힘들어진다
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0
  }
}
```

- 추가된 2 옵션("byzantiumBlock": 0, "constantinopleBlock": 0)은 스마트 컨트랙트를 실행하기 위한 옵션
  - 합의 방법이 달라지면서 필요하게 되었다.

```sh
geth --datadir ~/newGeth --http --http.addr "0.0.0.0" --http.port 8888 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 43958734 --ws --ws.addr "0.0.0.0" --ws.port 7777 --ws.origins "*" --nodiscover
```

- nodiscover : 남이 내 노드(peer)를 못찾게 한다.
  - === maxpeers 0

# 계정 생성

```sh
geth --datadir ~/newGeth account new
```

# Geth 실행 시 unlock

```sh
echo 패스워드 >> password
-> ~/newGeth/password 경로로 패스워드가 저장된다.
echo console
-> cmd 창에서 console 확인 가능
```

- echo << cmd, bash, powershell에서 사용하는 console.log
- echo
- '>>' : 해당 파일에 출력값을 저장

# 생성한 계정 unlock

```sh
geth --datadir ~/newGeth --http --http.addr "0.0.0.0" --http.port 8888 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 43958734 --ws --ws.addr "0.0.0.0" --ws.port 7777 --ws.origins "*" --nodiscover --unlock "0" --password ./newGeth/password
```

```sh
geth --datadir ~/newGeth --http --http.addr "0.0.0.0" --http.port 8888 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 43958734 --ws --ws.addr "0.0.0.0" --ws.port 7777 --ws.origins "*" --nodiscover --unlock "0,1" --password ./newGeth/password
```

- '--unlock "0" --password ./newGeth/password' -> 계정의 0번째 계정을 저장한 password 폴더의 password로 unlock 한다.
- unlock : accounts에서의 인덱스
- password : 비밀번호가 저장된 파일 (계정의 인덱스로 비밀번호를 판단하기에 같아도 저장된다.)
  - 줄바꿈으로 입력된 unlock 인덱스들과 맞춰야 한다.(저장된 password 내에서 줄바꿈으로 된 상태에서 저장)

# Solidity 프리티어 설정

```sh
npm init -y
npm i -D prettier-plugin-solitidy
```

```json
{
  "prettier.documentSelectors": ["**/*.sol"]
}
```

- setting.json에 해당 내용을 추가한다.

# Solidity 작성

```sol
// SPDX-License-Identifier: MIT >> // License 표시 (어떤 License를 사용하는가?) : 규칙

pragma solidity ^0.8.15; >> 솔리디티 버전 설정, 크립토 좀비 0.5.15?

contract Test {
// contract = javascript에서의 class와 같다.
  string text;

  constructor() {
    text = "Hi Block7";
  }

  function getText() public view returns (string memory) {
   // public : 외부에서 사용가능한 데이터
   // view : 읽기 전용 데이터 처리 / pure (선택사항)
   // returns : 반환하는 데이터
   // memory : 함수 내에서만 변수 사용, 데이터를 외부에 저장하지 않음(지역 변수 처리 (선택사항))
    return text;
  }

  function setText(string memory _value) public {
    text = _value;
  }
}
```

# 컴파일

```sh
npm i solc
npx solc --bin --abi ./test.sol
```

- solc : Solidity Compiler
- --bin : binary, transaction에 저장되는 실제 ByteCode
  - Solidity 등 우리가 작성한 코드를 EVM에서 실행할 수 있는 ByteCode로 변환(컴파일한다)
  - 해당 ByteCode는 트랜잭션에 저장
  - 해당 코드를 Receipt 내의 ContractAddress(CA)로 찾음
  - EVM이 알아서 코드를 실행
- --abi : Application Binary Interface, 스마트 컨트랙트 내의 함수와 매개변수 등을 json 형식으로 표기
  - abi는 데이터의 정확한 매칭(인코딩)을 위해서 사용
  - 어떤어떤 데이터(변수, 함수, 메서드, 프로퍼티)가 있는지 미리 정해두고 맞춘다.

# 스마트 컨트랙트를 트랜잭션으로 보내기

1. 편의를 위해 변수 선언

```sh
data = "608060405234...08130033";
// solc로 생성된 bin 파일 내의 모든 데이터
txObj = { from: eth.accounts[0], data, gas: 1000000 };
```

2. 트랜잭션 보내기

```sh
eth.sendTransaction(txObj)
# result "0xa054bb222adb37ca23696f588067195e7fb8093e2cc70776973b1c4f5e178933" >> 스마트컨트랙트에 등록한 트랜잭션의 hash값
miner.start()
miner.stop()
```

3. 트랜잭션 확인하기

```sh
eth.getTransaction("트랜잭션 hash값")

# result
# {
#   blockHash: "0x093f74236b31464eadd660e9e51db76915a93517fb64ab3049174734aef4a783",
#   blockNumber: 1325,
#   chainId: "0x29ec1ce",
#   from: "0x81c225faa727fc064f2e7ec62caeada716d6adc4",
#   gas: 1000000,
#   gasPrice: 1000000000,
#   hash: "0xa054bb222adb37ca23696f588067195e7fb8093e2cc70776973b1c4f5e178933",
#   input: "0x6080604...08130033",
#   nonce: 0,
#   r: "0x2006b6a57a81d50c2567b9ee4d6e0613083171d3c5d9642a259ca39100c1b560",
#   s: "0x4d2ae91568918f32083f97ba8b7a58cf645b48601ab52f7e740bc4ce417bdc90",
#   to: null,
#   transactionIndex: 0, // 블록 내의 몇번째 transaction인가
#   type: "0x0",
#   v: "0x53d83c0",
#   value: 0

eth.getTransactionReceipt("트랜잭션 hash값")
# 영수증 / 블록이 생성되기 전에 나오는 data / mining을 했을때만 찾을 수 있다. / mining 전에는 Null이 뜸
# result
# {
#   blockHash: "0x093f74236b31464eadd660e9e51db76915a93517fb64ab3049174734aef4a783",
#   blockNumber: 1325,
#   contractAddress: "0xef30e83106dd41ed9f1618bd0d623cc933557739",
#   cumulativeGasUsed: 565399,
#   effectiveGasPrice: 1000000000,
#   from: "0x81c225faa727fc064f2e7ec62caeada716d6adc4",
#   gasUsed: 565399,
#   logs: [],
#   logsBloom: "0x00000000000000000000...000000000000000",
#   status: "0x1",
#   to: null,
#   transactionHash: "0xa054bb222adb37ca23696f588067195e7fb8093e2cc70776973b1c4f5e178933",
#   transactionIndex: 0,
#   type: "0x0"
# }

```

- contractAddress : CA
  - CA : 스마트 컨트랙트에 대한 주소
  - EOA : Externally Owned Account, 지갑 주소, 메타마스크 / Geth 내의 지갑 등을 뜻한다.
  - CA/EOA 둘 다 계정으로 분류된다.

4. 컨트랙트 생성(연결)

```sh
contract=eth.contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"}])
```

- 매개변수로 abi로 추출된 데이터를 입력

5. 컨트랙트에 CA 연결

```sh
instance=contract.at("contractAddress")
# instance=contract.at("contractAddress")
```

- at 매서드를 호출하며 ContractAddress를 매개변수로 전달
- 앞으로 스마트 컨트랙트 실행 시 instance 변수를 사용

<!-- # 스마트 컨트랙트에 대한 계정이 따로 있다 -->

6. 컨트랙트 실행하여 확인

```sh
instance.getText.call()
```

- Solidity에서 작성해둔 getText 메서드를 호출

7. set 메서드 호출

```sh
instance.setText("전달 text내용", {from:eth.accounts[0]})
# from 계정은 잔액이 있는 계정 / 보낼때마다 비용을 지불해야함 / 가스값이 들기 때문에 잔액이 있는 계정이어야한다.
```

- 첫번째 매개변수로 값을 보내고 두번째 매개변수로 트랜잭션의 내용을 전달
- 데이터가 바뀌었기 때문에 채굴을 통해서 블록을 생성하여 적용한다.

# EVM은 무료인가?

- 유료이기 때문에 Gas 수수료가 필요하다
- EVM은 왜 유료인가? => 잦은 변경을 막기 위해서, 남의 컴퓨터를 쓰는데 무료일까?
- 이더리움 블록체인 네트워크에 노드(peer)가 하나인가?

  - 하나이면, 해킹이 쉬워진다.

- ganashe 사용

```sh
npm i -g ganache
```

```sh
1. ganache # 가나쉬 실행
2. geth attach http://localhost:8545
# 뒤의 순서는 같음
# attach 한 곳에서
3. eth.sendTransaction(txObj)
4. eth.getTransactionReceipt("트랜잭션 hash값")
5. ca="contract Address"
6. abi=test_sol_Test.abi 내용
7. contract=eth.contract(abi)
8. instance=contract.at(ca)
9. instance.getText.call()
10. instance.setText("전달 text내용", {from:eth.accounts[0]})
11. instance.getText.call()
```
