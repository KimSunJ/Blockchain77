# Truffle

- 블록체인 스마트 컨트랙트 프레임워크로, 많이 사용된다.
- 컴파일, 배포, 관리, 테스트 등을 제공

# Solidity Prettier 설정

```bash
npm i -D prettier-plugin-solidity
```

- 단, settings.json 수정 후에 가능

# Truffle 사용법

- 기본 설정

  ```bash
  npm init -y
  npm i truffle (truffle 설치)
  npx truffle init
  ```

  - sequelize init와 같이 폴더와 파일이 자동으로 생성된다.
  - 폴더와 파일 설명
    - contracts : 스마트 컨트랙트 코드 작성 폴더(Solidity 사용)
    - migrations : 배포 관련 코드 작성 폴더(Javascript)
    - test : 테스트 코드 작성 폴더(Jest)
    - truffle-config.js : 설정 파일

- 컴파일

  ```bash
  npx truffle compile
  # sol 파일 추가할 경우 다시 컴파일링
  # build 폴더 / contracts / test.json 생성
  ```

  - 생성된 폴더
    - build/contracts : compile로 생성된 데이터를 json 형식으로 추출
  - 옵션 없을 시에 수정된 sol 파일만 인식하여 컴파일을 진행
    - all 옵션일 시 무조건 전부 진행(--all)

- 배포
  (블록체인 네트워크에 추가한다는 의미 / 서버를 껐다가 키면 다시 배포해야함)

  ```bash
  npx truffle migration
  # 명령어 실행 전, truffle-config.js 파일 내에서 development 관련 코드 주석 해제
  # npx truffle migration --reset / 전부 다시 배포한다
  ```

  - 파일 명은 '번호 _ 내용 _ 컨트랙트명'의 형식을 지켜야한다.

    - ex) 1_deploy_Test.js

    ```js
    const test = artifacts.require("Test");
    // 컴파일 후 생성된 Json 파일명을 전달하여 스마트 컨트렉트 데이터를 가져온다.

    module.exports = function (deployer) {
      deployer.deploy(test);
    };
    // deployer : truffle이 제공하는 배포를 위한 객체
    // module.exports => default라는 개념이 없다.
    // deployer.deploy(counter); | 배포 코드 실행될때마다 transaction이 된다.
    ```

  - 배포 결과에서 CA를 가져오자
    - contract address: 0x0cE9b51EC200651A493320fBE049b34f67f761D7

- truffle을 사용해서 확인

```bash
npx truffle console
# 결과값 truffle(development) >
Test.deployed().then(instance => test = instance)
test.getText.call() # 처음 설정한 값
test.setText('text') # 바꿀 값
test.getText.call() # 바꾼 값 확인
```

- 컨트랙트 : 코드를 저장하고, 실행
- 트랜잭션 : 저장하기 위한 공간

- Jest 테스트
  - test 폴더 내에 코드 작성
  - 명령어를 입력
  ```bash
  npx truffle test (test 고정값인 폴더명(truffle로 생성된 폴더))
  ```

# React로 Front 작성

1. React 프로젝트 생성

```bash
yarn create react-app front
```

2. web3 설치

```bash
cd front
yarn add web3
```

3. 카운터 스마트 컨트랙트 생성
