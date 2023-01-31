import express, { Express, Request, Response } from "express";
// Express 타입 불러오기
import axios from "axios";
import path from "path";
import Wallet from "./wallet";

const app: Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/wallet/create", (req: Request, res: Response) => {
  //   지갑을 생성해달라
  res.json(new Wallet());
  //   res.end();
});

app.get("/wallet/list", (req: Request, res: Response) => {
  res.json(Wallet.getList());
});

// app.get('/user/laskjfalskdjfsdf/nft/create')
// app.get('/user/laskjfalskdjfsdf/nft/list') >> 'laskjfalskdjfsdf' adress 부분 / 요청 보내는 부분
// app.get('/user/:address/nft/list') >> 'laskjfalskdjfsdf' adress 부분 / 서버에서 보내는 부분

app.get("/wallet/:address", (req: Request, res: Response) => {
  const address: string = req.params.address;
  // req.params 라우터의 매개변수 /:id/:name 경로가 있으면 ":id"속성과 ":name"속성을 req.params.id, req.params.name으로 사용할 수 있다.
  // www.example.com/post/1/jun 일 경우 1과 jun을 받는다.
  const privateKey: string = Wallet.getWalletPrivateKey(address);
  res.json(new Wallet(privateKey));
});

app.post("/transaction/send", (req: Request, res: Response) => {
  const signature = Wallet.createSign(req.body);
  console.log(signature);
  // 지갑서버에서 블록체인 서버에 데이터를 보내고 있다.(검증하기 위해서)
  const txObj = {
    sender: req.body.sender.publicKey, // 누가 받았는지
    received: req.body.received, // 누가 보내느느지
    amount: req.body.amount, // 금액
    signature, // 서명
  };

  axios.post("http://localhost:8080/transaction/send", txObj, {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
      // HTTP 통신에서의 인증 방법
      // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
      // base64형식을 기본으로 사용하고, Buffer를 통해서 base64형식으로 바꿔준 것이다.(인증을 위한 데이터)
      //
    },
  });

  res.json(signature);
});

app.listen(9514, () => {
  console.log("wallet server open 9514");
});
