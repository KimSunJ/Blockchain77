# clef

- 기존에 personal 객체를 사용하던 지갑 계정 기능을 외부로 추출
- 현 수업으로는 계정 생성만 진행 할 생각

```sh
# 계정 생성
clef newaccount --keystore ~/myGeth/keystore
# 입력 시 사용할 것인지 물어본다, ok 하자
# 10글자 이상의 비밀번호(pw 1234567890)를 입력하면 계정이 생성된다.
```

- myGeth에 keystore 폴더에 들어가면 방금 생성한 계정 정보 파일이 있다.
- 왜 사용할 것인지 묻는 이유?
  - personal 객체를 없애면서 만들고 있는 도중이라 오류가 많다.

```sh
 modules: admin:1.0 debug:1.0 engine:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 rpc:1.0 txpool:1.0 web3:1.0
 # modules 들의 하나하나가 객체로 이뤄짐
```
