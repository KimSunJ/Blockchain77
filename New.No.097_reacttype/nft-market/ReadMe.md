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
