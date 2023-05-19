import P2P from "./p2p";
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
  const { data }: { data: Array<string> } = req.body;
  const newBlock: IBlock | null = ws.addBlock(data);
  if (newBlock === null) res.send("error data");
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
  // {
  //   sender: '032374A62657A8159574673C1717B735159F3445BC1E9E617B323CBD0FB58BD965',
  //   received: '17B735159F3445BC1E9E617B323CBD0FB58BD965',
  //   amount: '5',
  //   signature: {
  //     r: 'ea1daa82957014ee229fcb1fb45029a54e244034caac114a272c31905d26c32',
  //     s: '4f8bf16306286039d1c74999cdeff728fbd60a3e0e6481c7d2fb7593c2155393',
  //     recoveryParam: 0
  //   }
  // }
  console.log(req.body);
  const isValid = Wallet.verify(req.body);
  console.log("5-12 서명 확인 결과 출력");
  console.log(isValid);
  res.end();
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
