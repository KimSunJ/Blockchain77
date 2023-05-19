# RPC

- Remote Procedure Call 의 약자, 원격 프로시저 호출
- 별도의 코딩 없이 다른 공간에서 함수 등을 호출할 수 있는 통신 기술
- IPC를 사용하여 사용했었던 admin, eth, miner 등이 있다.

# IPC 파일이 아닌 HTTP 통신으로 조작하기

## geth를 HTTP 통신으로 사용할 수 있도록 실행

- HTTP 통신을 사용하기 때문에 port가 열려있으면 외부에서 조작이 가능하다.
  (HTTP로 조작하는 것은 내 컴퓨터에 있는 geth를 다른 디바이스나 다른 컴퓨터로 조작 가능하다는 의미)
- Ubuntu 조작은 원격 프로그램으로 외부에서 조작이 가능하지만, HTTP 통신은 그럴 필요가 없다.
- 프로그램 내에서의 통신 (IPC)

```sh
# 메인넷 오픈
geth
# 로컬 서버 오픈
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50
```

- datadir : 개인 이더리움 네트워크 데이터 저장 폴더
- http : HTTP 서버를 배포, IPC로 조작하던 개인 이더리움 네트워크를 HTTP 통신으로 조작
- http.addr : 요청 가능한 IP 주소 설정, 기본값 127.0.0.1(로컬/localhost), 0.0.0.0은 모든 IP 주소 허용
- http.port : 요청 가능한 port 설정, 기본값 8545
- http.corsdomain : CORS에 대한 설정, 와일드카드('\*' 어디서든 사용 가능) 사용 가능
- http.api : 사용 가능한 RPC를 설정, 기본값 eth, net, web3
- networkid : 개인 이더리움 네트워크 아이디, 체인 아이디와 같게 설정
- allow-insecure-unlock : HTTP 통신으로 계정을 열 수 있게 한다.(unlock)
  (공식 홈페이지에서 테스트 이외에 권장하지 않는다.)
- syncmode : 피어 연결 시 동기화 방법 설정
  - fast : 블록 헤더, 최신 1024개의 트랜잭션 동기화, 기본값 << 삭제됨(1.11 version)
  - full : 모든 데이터 동기화
  - light : 블록 헤더, 잔액 관련만 동기화
  - snap : 최근 128개 블록만 동기화, 기본값 << 1.11 version 부터

# geth에 HTTP 통신으로 연결

```sh
geth attach http://localhost:8080
```

# attach로 연결한 곳에서 입력

## 계정 생성

```sh
personal.newAccount()
```

## 계정 풀기(unlock)

```sh
# 재시작이 필요하지 않는다.
personal.unlockAccount(eth.accounts[0])
# unlock 유효시간 짧다.
```

# geth에 HTTP 통신으로 요청

- attach 하지 않고, HTTP 통신을 사용한다.

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_accounts", "params": []}' http://localhost:8080
```

- X : 통신에 사용하는 method
- H : header
- data : 보내는 요청 body

  - id : chain id
  - jsonrpc : json 사용하는 RPC 버전

  ```sh
  {
  modules: {
    admin: "1.0",
    eth: "1.0",
    miner: "1.0",
    net: "1.0",
    personal: "1.0",
    rpc: "1.0",
    txpool: "1.0",
    web3: "1.0"
  },
  getModules: function(callback)
  }
  ```

  - method : 이더리움의 호출 메서드명
  - params : 메서드의 인자값 (매개변수)

- 위의 내용 결과값

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": [
    "0x697ad3452cae68fd6cddce42014f4cb8fdd0fdef",
    "0xfa8671201d10b5058a7957994f3c90fa5c7124c7",
    "0xbfa4066fed15ed1f5ff23a85da4bc99a1177076c"
  ]
}
# eth.accounts 내용과 "result" 내용이 같다.
```

- 새로운 계정 생성

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "personal_newAccount", "params":["password"]}' http://localhost:8080
# 계정 비밀번호를 params string(password)으로 사용하여 생성
```

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0xe5a521592cf40c4cf7ad18b932fe9774e7b7db55"
}

# eth.accounts
["0x697ad3452cae68fd6cddce42014f4cb8fdd0fdef", "0xfa8671201d10b5058a7957994f3c90fa5c7124c7", "0xbfa4066fed15ed1f5ff23a85da4bc99a1177076c", "0xe5a521592cf40c4cf7ad18b932fe9774e7b7db55"]

```

- 계정 언락

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "personal_unlockAccount", "params":["0x697ad3452cae68fd6cddce42014f4cb8fdd0fdef", "1234567890"]}' http://localhost:8080
# 유효시간 짧음
# "params" : ["unlock 계정", "unlock 계정의 비밀번호"]
# localhost > 내부 ip에선 돌지 못하고 통신사가 주는 ip로 해야함
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true }
```

- 채굴 보상 받을 지갑 주소 설정

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0xfa8671201d10b5058a7957994f3c90fa5c7124c7"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true }
```

- 채굴 시작

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_start", "params": [1]}' http://127.0.0.1:8080
```

    - miner.start(1) << 매개변수 쓰레드를 하나만 사용한다.(컴퓨터 성능에 따라 다름)
        - thread : CPU의 작업 최소 단위 (Javascript = thread 1)

```json
{ "jsonrpc": "2.0", "id": 50, "result": null }
```

- 채굴 중지

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_stop", "params": []}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": null }
```

- 잔액 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_getBalance", "params":["0xfa8671201d10b5058a7957994f3c90fa5c7124c7", "latest"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": "0x11f18c4d62dfd65000" }
# 잔액을 16진수로 받고 있다.
```

- txpool

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "txpool_content"}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } }
```

- 트랜잭션 보내보자

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params":[{"from":"0x697ad3452cae68fd6cddce42014f4cb8fdd0fdef", "to":"0xfa8671201d10b5058a7957994f3c90fa5c7124c7", "value":"0x3B9ACA00", "gas":"0x15f90", "gasPrice":"0x430e23400"}]}' http://127.0.0.1:8080
```

    아래는 선택사항, 안넣어도 됨
        - gas : 내가 이 트랜잭션에 사용한 수수료
        - gasPrice : 가스당 가격(수수료 가격을 결정)
        -> "0x15f90" 가스 당 가격(gasPrice)이 "0x430e23400" 이다

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0x85f171eaad0e3898da5f5f52721d17703b1be1a7b54e1a5edb1aa2ab572086e5"
}
```

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "txpool_content"}' http://127.0.0.1:8080
```

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_start", "params": [1]}' http://127.0.0.1:8080
```

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_stop", "params": []}' http://127.0.0.1:8080
```

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "txpool_content"}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } }
```
