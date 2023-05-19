import P2P, { IMessage, MessageType } from "./p2p";
import express, { Express, Request, Response } from "express";
import Wallet from "@core/wallet";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

// 보안 작업
app.use((req: Request, res: Response, next) => {
  console.log("5-8 지갑 서버에서 보낸 요청 받음, 인증 확인");
  const baseAuth = req.headers.authorization?.split(" ")[1] || "";
  console.log("baseAuth :", baseAuth);
  if (!baseAuth || baseAuth === "") return res.status(401).end();
  // 인증 정보가 없으면 401(유효 하지 않은 인증)을 응답한다.
  const [userId, userPw] = Buffer.from(baseAuth, "base64")
    .toString()
    .split(":");
  if (userId !== "admin" || userPw !== "1234") return res.status(401).end();
  console.log("5-9 인증이 확인되면 다음으로 넘어감");
  // 401 확인 방법 =>
  console.log("check");
  next();
});
// http 통신에서 header를 이용한 인증 방법
// Authorization: Basic 방식을 사용한다.
// 아무나 내 블록체인 네트워크(서버 || peer)에 블록을 추가하지 못하게 하기 위해서

app.get("/chains", (req: Request, res: Response) => {
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  console.log("POST /block/mine");
  // const { data }: { data: Array<string> } = req.body;
  const { data }: { data: string } = req.body; // 누가 했는지, 주소만 넣어줄 것이기 때문
  // const newBlock: IBlock | null = ws.addBlock(data);
  const newBlock: IBlock | null = ws.mineBlock(data);
  if (newBlock === null) res.send("error data");

  const message: IMessage = {
    type: MessageType.allBlock,
    payload: [newBlock],
  };
  ws.broadcast(message);

  res.json(newBlock);
  // 상대방에게 내 블록을 찍을 뿐 내 자신에겐 찍히진 않는다.
});

app.post("/peer/add", (req: Request, res: Response) => {
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  // 자체에 get만 하고 있다. 다른 무언갈 하질 않는다.
  // 나에게 접속했던 소켓들을 가져올 뿐이다 >> getSockets
  // 나에게 연결되어 있는 peer들을 확인하려고 연결하는 것이다.
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

app.post("/transaction/send", (req: Request, res: Response) => {
  console.log("5-10 지갑 서버에서 보낸 요청 받음");
  console.log(req.body);
  // const isValid = Wallet.verify(req.body);
  const result = Wallet.sendTransaction(req.body, ws.getUtxo);
  console.log(result);
  if (result.isError === true) res.send(result.msg);
  else {
    ws.updateUTXO(result.value);
    res.end();
  }
  console.log("5-12 서명 확인 결과 출력");
  // console.log(isValid);
  res.end();
});

app.get("/utxo", (req: Request, res: Response) => {
  res.json(ws.getUtxo);
});

app.post("/balance", (req: Request, res: Response) => {
  res.json({ balance: Wallet.getBalance(req.body.address, ws.getUtxo) });
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0; // 테스트용

app.listen(ports[idx][0], () => {
  console.log("server start " + ports[idx][0]);
  ws.listen(ports[idx][1]);
  // WebSocket(P2P) 서버 생성/배포
});
