# 로컬 서버 오픈

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 console
# full 대신 light로 최소 정보만 가져올 시 블록을 못가져온다
# "\*" 때문에 axios 오류가 뜸
```

- 옵션으로 console을 붙일 시 ipc에 자동으로 연결된다.

# MetaMask 설정

1. 설정에서 네트워크로 들어간다.
2. 현재 http://localhost:8545로 되어 있는 네트워크를 수정한다.
   - 네트워크 이름 : 자유
   - 새 RPC URL : http://localhost:8080 현재 잡으려는 이더리움 네트워크의 주소(port 포함)
   - 체인 ID : 체인 ID
   - 통화 기호 : 사용하는 코인 표기법

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0xB9B142a69aADF49fC6192dfC0200DD82De2ff49f"]}' http://localhost:8080
```

3. 가져오기 geth 계정 > 유형 선택 JSON 파일 선택 > 파일 선택에서 mygeth/keystore에 있는 계정 선택 > 비밀번호 입력 후 가져오기 클릭
   - 보내기 > 계정 간 전송이 가능하다
