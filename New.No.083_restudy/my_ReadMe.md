# React + Node.js(Express) Server all in one

## 1. React Project 설치할 폴더 이동

## 2. React Project 설치

- 설치는 폴더 기준으로

```sh
cd board
yarn create react-app ./ >> 폴더가 만들어진 후 yarn create 할 경우
```

## 3. 라이브러리 설치

```sh
yarn add express dotenv express-session cookie-parser morgan styled-components react-router-dom mysql2 sequelize sequelize-cli axios
-> yarn이 호환성을 잘 맞춰줘서 좋다
yarn add -D npm-run-all nodemon
-> 3000 port 와 8080 Port 두개를 동시에 열 수 있도록 한다
```

- Express Server
  - express : Node.js의 HTTP 서버 구현
  - dotenv : .env 폴더 자동 파싱, process 객체에 env 프로퍼티에 추가
  - express-session : express 서버용 session 라이브러리
  - cookie-parser : Front End에서 보내온 쿠키 자동 파싱
  - morgan : 테스트 로그 작성용
  - mysql2 : Sequelize와 함께 사용하는 mySQL 라이브러리
  - sequelize : DB 파싱용 라이브러리
  - sequelize-cli : sequelize 명령어 라이브러리
- React
  - react-router-dom : React에서 Router 사용하기 위한 라이브러리
  - axios : Back End와 API 통신을 하기 위한 Front End 라이브러리
- Dev
  - nodemon : Node.js 실행 시 파일 수정에 대해 즉각적인 적용 라이브러리
  - npm-run-all : 여러 서버를 한번에 실행하기 위한 라이브러리

## 4. Sequelize 기본 설정 설치

```sh
cd server
node index (server 실행)
npx sequelize init
npx nodemon index (nodemon으로 실행)
```

---

```sh
yarn start # 경로 : board
npx nodemon index # 경로 board/server
# packagejson 상황이 아니고 global로 설치가 안되어있기 때문에 'nodemon'으로 실행 안한다
```

-> 최종적으로 바뀌게 되면 yarn build를 해서 다시 실행을 해야한다.

```sh
# package json
"start": "npm-run-all --parallel start:**",
"start:server": "nodemon ./server",
"start:client": "react-scripts start",

# start:** => server, client 둘다 실행 하도록 해준다
```
