- front

```bash
yarn create react-app front --template typescript
cd front
yarn add web3 axios @metamask/providers
```

- back

```bash
npm init -y
npm i express dotenv @openzepplelin/contracts @remix-project/remixd cors multer @pinata/sdk
npm i -D @types/node nodemon @types/express @types/multer prettier-plugin-solidity tsconfig-paths
```

-typescript

```bash
npm list -g
npm i -g typescript ts-node

# macOS
sudo npm list -g
# ts-node로 실행하려고 함
# npx truffle X truffle
sudo npm i -g typescript ts-node
```

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./build/index.js",
    "start:dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/index.ts"
  },
// npm run start:dev으로 back실행
```

# Front

- 2023.03.16 Mint | List

# API Server

- 2023.03.16 Mint | List

# Solidity

- 2023.03.17 Mint | List

# Pinata(IPFS)

- 2023.03.17 Mint | List

```bash
npx remixd -s . -u https://remix.ethereum.org
```

- truffle은 coinbase가 자동으로 설정된다.
- NFT_CA -> 민팅
- SALE_CA -> 판매 구매

- cd back

```bash
npm i web3 axios
npm i web3-utils # typescript여서 설치해줘야하는 것 | type을 지정해줌
```

- artifacts : remix쪽에 compile 돌리면 생기는 파일 >> migration과 비슷한 역할한다. Artifacts는 단순한 계약(contract)의 json 파일이다.
- artifacts의 json들의 abi를 가져올 것이다.

# ERC721 NFT Project

## 최소 기능

- ERC721 배포
- NFT 등록
- NFT 판매
- NFT 구매
- NFT 목록(내 목록 | 판매 목록 | 전체 목록)

## 최소
