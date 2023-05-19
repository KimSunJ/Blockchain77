```bash
#0306
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
```

## MIT 라이센스

- 미국 매사추세츠 공과대학교(MIT)에서 학교 학생들을 돕기 위해 개발한 라이센스

# Solidity 문법

- 타입(자료형)
  - int : 정수
  - string : 문자열
  - int[] or string[] : 배열
  - address : 주소(지갑 계정 주소 | CA)
- msg.sender : 보낸 지갑 계정
- mapping : Javascript의 객체와 비슷하다.

  - 형식은 mapping(키 => 값) 매핑이름
  - hashMap, 키는 저장되지 않는다.
  - hashMap은 키를 hash화하여 해당 메모리주소에 값을 저장한다.
  - hash 방식은 keccak256을 사용

    ```js
    let test = [];
    test[234234] = "saresare";
    test["키의 hash"] = "값";
    test["키의 hash"] = "값1";
    ```

- constructor에 매개변수 전달

  - 함수의 매개변수 저장 위치
    - 옵션명
      - storage : 블록체인 네트워크에 저장하여 공유된다.
      - memory : 함수 내에서만 사용하고 버린다.
        - 구조체(struct), 배열(array), 매핑(mapping)에 사용해야 한다.
        - int는 정수형 타입으로 배열로 나타낼 수 없다.
        - string은 문자열로 배열과 같이 메모리를 사용한다.
  - 1_deploy_Test.js에서 매개변수 전달

    ```js
    deployer.deploy(Test, "solidity로 넘겨졌니?");
    // deployer.deploy(sol파일명, 매개변수) 형식으로 매개변수 내용을 전달한다.
    // 매개변수로 넘기면서 Test.sol에서 constructor(){ text="testing" }
    // text="testing"이 없어도 되어졌다.
    // constructor에서 매개변수를 설정한 만큼 1_deployed_Test.js에서 매개변수로 넘겨줘야한다.
    // npx truffle compile 은 sol 파일 수정했을 경우만 실행
    ```

    ```bash
    npx truffle migration
    # CA 주소를 가져올 수 있는 것을 볼 수 있다.
    ```

- 배포한 지갑 주소 확인하기

```bash
npx truffle console
Test.deployed().then(instance => test = instance)
#
test.owner() # coinbase가 배포를 했다고 인식을 해서 가져온다. ganache이기 때문에 이렇게 인식하고, geth에서는 coinbase가 아닌 miner가 배포를 했다고 인식을 해서 가져온다.
# test.owner()값이 어떤 것과 같은지 확인
web3.eth.getTransactionReceipt('migration에서의 transactionHash값')
## test.owner() == from 값
```

```js
web3.eth.Contract(abi, CA);
// deployed, 이미 배포된 스마트 컨트랙트 정보를 가져온다.
// const deployed = new web3.eth.Contract(abi, CA);
```

- Test 객체가 이미 abi와 CA를 갖고있다.

  ```bash
  Test.deployed().then(instance => 변수명 = instance)
  변수명.owner()
  # callback 함수 내에서 선언한 변수를 밖에서도 사용 가능하다.
  ```

  - Test의 deployed 메서드를 호출하면 위의 JS 코드처럼 배포된 스마트 컨트랙트 정보를 가져온다. 단, Promise 형식이다.
  - Promise 형식에 따라 then을 사용하여 배포된 스마트 컨트렉트를 가져오는데 성공하면 가져온 객체를 test에 정의한다.
  - 이후 test로 스마트 컨트렉트의 메서드, 변수들을 호출할 수 있다.

# 간단한 토큰 구현(testToken.sol)

- 토큰은 Ethereum 기반이다.
- 토큰의 종류

  - ERC721, ERC1155 << 많이 알려진 토큰(NFT로 사용됨)
    - ERC721 : 하나의 NFT는 하나의 소유자를 갖는다.
    - ERC1155 : 하나의 NFT는 다수의 소유자를 갖는다.
  - ERC223, ERC621, ERC777 등이 있다.
  - 가장 기본적인 토큰은 ERC20(FT)이라고 한다.
    - Ethereum Request for Comment 20
    - 이더리움 블록체인 네트워크에서 정한 표준 토큰
    - 스마트 컨트랙트로 생성
  - FT / NFT
    - FT : Fungible Token / 대체 가능한 토큰(가치가 같은 것 / 내가 갖고 있는 1BIT와 다른 사람이 갖고 있는 1BIT)
    - NFT : Non-Fungible Token / 대체 불가능한 토큰(고유한 블록체인 기반 토큰)

- 현재 코드 상에서는 단순하게 token 정보를 어떻게 받고 있는지에 대한 데이터만 구현되고 있다.(최소한의 내용 - 토큰까지만 만드는 것 가치가 생기면 돈이 되는 것)
- 가스는 트랜잭션을 보낼 때이기 때문에 ether에서 알아서 차감된다.

```solidity
  mapping(address => uint256) public balances;
  string public name;
  string public symbol;
  uint8 public decimals;
  uint public totalSupply;
  <!-- 1000 * 10 ** deicimals => 제곱 먼저 계산 / 기본으로 wei로 저장되기 때문에 '10 ** deicimals'를 사용해야 ether로 계산되어 symbol을 사용할 수 있다.-->
  <!-- totalSupply = 1000DG -->
```

- balances : 각 지갑 계정에 대한 잔액
- name : 토큰 이름
- symbol : 토큰 단위(ETH)
- decimals : 소수점의 개수(10의 -n승 인지?, wei와 ether의 관계)
- totalSupply : 총 발행량

- view : 함수에서 변수를 호출하지만 수정하진 못한다.(js의 const 변수로 사용하는 느낌)

  ```solidity
  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
  ```

- 잔액 보내기

  ```solidity
  function transfer(address _to, uint _value) public returns (bool success) {
    require(balances[msg.sender] >= _value);
    // 문제가 없을 시 트랜잭션을 보낸 사람에게서 value만큼 돈을 빼고
    balances[_to] += _value;
    // to, 즉 받는 사람에게 value만큼 돈을 더한다.
    return true;
  }
  ```

  - require : 조건을 확인하여 에러를 발생하거나 코드를 계속 진행한다.
    - 첫번째 매개변수로 조건을 전달하며, 해당 조건이 true면 계속 진행, false면 중단한다.
    - 두번째 매개변수로 에러 발생 시 출력할 로그를 전달한다.

- 확인해보기

```sh
metamask
1. ganache 계정 가져오기
2. 토큰 가져오기
3. 0번째 계정에서 토큰 가져오게 되면 설정한 총 발행량이 나온다.
```

```solidity
testToken.sol
 constructor(string memory _symbol) {
    balances[msg.sender] = totalSupply;
    symbol = _symbol;
  }
```

```js
1_deploy_TestToken.js
const TestToken = artifacts.require("TestToken");

module.exports = function (deployer) {
  deployer.deploy(TestToken, "ST");
};
```
