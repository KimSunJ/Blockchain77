# Geth

- 계정 생성을 위해서 go-ethereum 폴더에서 아래 명령어 실행

```sh
geth / go-ethereum 폴더 내에서
make all
```

```sh
# mac OS
geth 하기 전에
source ~/.bash_profile을 실행한 후에
geth 실행
```

- geth 명령어만으로 실행 시 기본적으로 mainnet에 접근하도록 되어있다.

```sh
Chain ID: 1 (mainnet)
실제 마이닝할 때 쓰이는 mainnet
```

# private Ethereum Network

- 개인 이더리움 서버 열어보자
- genesis.json 파일을 만들어서 기본 설정을 입력한다.

```sh
vi ~/genesis.json
```

```json
{
  "difficulty": "200000",
  "gasLimit": "3100000",
  "alloc": {
    "지갑 주소": {
      "balance": "100000000"
    }
  },
  "config": {
    "chainId": 50,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0
  }
}
```

- difficulty : 문제 난이도
- gasLimit : 블록당 가스 지출 제한량 (최대 거래(트랜지션마다 다름) 수수료)
- alloc : 제네시스 블록 생성 시 지갑에 보상 지급(빈 객체도 상관 없다)
- config
  - chainId : 블록체인 네트워크 식별 ID
  - homesteadBlock : 이더리움 버전
  - eip : Ethereum Improvement Proposal을 의미하며 기본값은 0이다.
    - 이더리움 핵심 프로토콜 사양 등의 표준을 설명한다.
    - eip150 / => 표준 제한된 것들 중 150번째의 것을 사용하겠다는 의미

# geth로 개인 이더리움 네트워크 생성

```sh
# 개인 이더리움 네트워크 생성
geth --datadir myGeth init genesis.json
```

- myGeth 폴더가 생성되고 그 안에 아래와 같이 폴더와 파일이 생성된다.

```sh
# 트리 내용 중 일부
├── geth
│   ├── LOCK
│   ├── chaindata : 블록 헤더 내용, 블록 바디의 트랜잭션 내용 파일이 저장된다.
│   ├── lightchaindata
│   └── nodekey
└── keystore : geth가 갖고 있는 계정 정보가 저장된다.
```

- 생성된 개인 이더리움 네트워크를 실행하자

```sh
# home 경로에서
geth --datadir ~/myGeth
geth --datadir myGeth
```

- Chain ID: 50 (unknown) 아무거나 열었다는 의미

# 열려있는 서버에 접근해서 데이터를 뜯어보자

## IPC

- Inter-Process Communication
- 프로세스 간에 통신을 말한다. (서로 데이터를 주고받고 하는 통신을 말함)
  - 프로세스는 컴퓨터에서 실행되고 있는 프로그램을 말한다.
- geth로 열어둔 서버에 접근 명령어

- geth가 없다고 뜨면 source ~/.bash_profile

```sh
# macOS
source ~/.bash_profile
geth attach ~/myGeth/geth.ipc
# 이미 home 경로인 상태에서는 없어야함
geth attach myGeth/geth.ipc
```

- IPC 연결 후에 사용하는 명령어들은 Javascript 기준의 객체와 같다.

```sh
# eth.getBalance(지갑 주소) => 지갑의 돈을 받아 출력한다.
eth.getBalance("지갑 주소") # 100000000
eth.getBlock(0) # 제네시스 블록 가져와 출력
# 출력 결과 : 1e-10 (1의 -10승) 그만큼의 eth를 가지고 있다.
web3.fromWei(eth.getBalance("지갑 주소"),'ether')
- 1의 2의 18승 = 1eth
- eth의 잔액
```

- IPC로 접근 시 Javascript로 구현된 모듈을 사용하게 되며 그 객체들은 아래와 같다.

  - admin:1.0 : Peer의 정보
  - debug:1.0
  - engine:1.0
  - eth:1.0 : 체인 정보
  - ethash:1.0
  - miner:1.0 : 채굴 정보
  - net:1.0
  - rpc:1.0
  - txpool:1.0 : 트랜잭션 풀
  - web3:1.0 : 통신 관련 정보

- IPC (geth.attach한 부분)

```sh
eth.accounts
# Geth가 갖고 있는 계정 배열
우리가 넣은 지갑 주소와 다른 지갑 (geth가 갖고 있는 지갑)
eth.getBalance(eth.accounts[0])
# 결과 0 (새로 만들었기 때문에)
eth >> chain 관련 ether 관련된 내용들이 나온다.(getBlock, getCode, 등등)
admin >> peer들의 정보를 가져와서 보여준다.
miner >> 채굴자에 대한 정보
miner.setEtherbase(eth.accounts[0]) # 계정 중 0번째 계정을 채굴 시 보상 받을 계정으로 설정
eth.coinbase # 현재 채굴 보상을 받는 계정을 확인한다.
# 채굴할 때 보상 받을 계정으로 0번째 계정을 설정한다.
miner.start() # 채굴 시작 (아무것도 없는 블록을 캐는 중)
# 결과값 null // 비어있기 때문에
# mined potential block > block 채굴 시작
miner.stop() # 채굴 중단
eth.getBlock('latest') # 마지막 블록을 가져온다.
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether') # 얻은 ether 확인
eth.sendTransaction({
    from: eth.accounts[0],
    to:eth.accounts[1],
    value: web3.toWei(1,"ether")});
# 계정이 잠겨 있다.
```

```sh
# 계정 잠금 풀기
geth --datadir myGeth --unlock "accounts[0]계정"
# 서버 실행 후 비밀번호 입력하고 엔터

# transaction 보냄
eth.sendTransaction({
    from: eth.accounts[0],
    to:eth.accounts[1],
    value: web3.toWei(1,"ether")});
# 결과값 value : 1,000,000,000,000,000,000 (1 Ether)
txpool.content # 거래 내역을 보기 위해
# 채굴을 안했기 때문에 거래가 되지 않았다.
# 블록이 받은 것보다 많은 이유 : 채굴을 동시에 했기 때문
1. miner.setEtherbase(eth.accounts[0])
2. miner.start() # 금방 시작한다 (이유는 준비는 처음 시작할때 했기 떄문)
3. miner.stop()
4. eth.getBalance(eth.accounts[1]) / eth.getBalance(eth.accounts[0])
5. txpool.content # 비어 있는 이유 이미 블록에 추가되었기 때문에
```

## miner.start() 시 아래 내용이 뜨는 이유

- Generating DAG in progress << 블록을 계산할 때 빠르게 계산하기 위해서 미리 준비한다.

```sh

```

## 이더리움에서 사용하는 코인 단위

- wei : 이더리움의 최소 단위
- Kwei : 1,000 wei
- Mwei : 1,000,000 wei
- Gwei : 1,000,000,000 wei
- Ether : 1,000,000,000,000,000,000 wei
  - 0.2 Ether = 200,000,000,000,000,000 wei
    -> Ether를 기준으로 100,000,000은 1의 -10이다.

```sh
web3.toWei(1,'Pwei') > 단위 확인 가능
units{
  "noether": "0",
  "wei": "1",
  "kwei": "1000",
  "Kwei": "1000",
  "babbage": "1000",
  "femtoether": "1000",
  "mwei": "1000000",
  "Mwei": "1000000",
  "lovelace": "1000000",
  "picoether": "1000000",
  "gwei": "1000000000",
  "Gwei": "1000000000",
  "shannon": "1000000000",
  "nanoether": "1000000000",
  "nano": "1000000000",
  "szabo": "1000000000000",
  "microether": "1000000000000",
  "micro": "1000000000000",
  "finney": "1000000000000000",
  "milliether": "1000000000000000",
  "milli": "1000000000000000",
  "ether": "1000000000000000000",
  "kether": "1000000000000000000000",
  "grand": "1000000000000000000000",
  "mether": "1000000000000000000000000",
  "gether": "1000000000000000000000000000",
  "tether": "1000000000000000000000000000000"
}
```

# nvm 실행 오류 시

- 글자에 색상이 사라졌을 때

```sh
source ~/.bashrc
```

# Mac에서 터미널 실행 시 source 다시 입력 안하고 싶으면 추가

```sh
# ~/.zshrc 파일 추가
vi ~/.zshrc
# 내용으로
source 홈 경로/.bash_profile
- 입력 후에 터미널 재실행
```
