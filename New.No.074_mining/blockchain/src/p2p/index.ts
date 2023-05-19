import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";
import { threadId } from "worker_threads";

// const TYPE = {
//   BLOCK:1,
//   CHAIN:2,
// }

// TYPE.BLOCK
// 위와 같은 형식으로 사용하는 것이 enum의 역할이다.

export enum MessageType {
  // enum : 배열과 비슷한 순서가 있는 데이터이다.
  //    - '열거형' 이라고 한다.
  //    - 위의 코드와 같은 역할을 한다.
  //    - 변수에 정의할 값을 미리 정의했다고 생각하자.
  // MessageType << 정의한 이유 << 어떤 메세지를 주고 받았는지 확인하기 위해서 타입으로 설정했다.
  lastBlock = 0, // "lastBlock" = 0 >> string 형식으로 넣으면 오타 오류가 생길 수 있다.
  // 마지막을 블록을 달라고 하고 준다.
  allBlock = 1,
  // 전체 체인 달라고 하고 준다.
  addBlock = 2,
  // 블록이 추가됐다고 알려주고 무엇이 추가됐는지 알려준다.
  addTx = 3,
  // 트랜잭션 추가됐다.(보내준 것 추가해라)
}
// 오타 같은 오류를 줄이기 위해서 사용한다.
// class는 객체를 만드는 놈이고, enum은 객체를 아예 만들지 않는다.

export interface IMessage {
  // 주고 받을 메세지에 대한 타입
  type: MessageType;
  // 어떤 메세지를 주고 받았는지 확인
  payload: any;
  // 메세지에 담긴 데이터
}

class P2P extends Chain {
  // Chain을 상속받는 이유 : 현재 P2P 서버에 기존의 체인을 상속함으로써 블록 추가 등에 있어서 편함
  private sockets: Array<WebSocket>; // 연결된 peer의 목록

  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  connectSocket(socket: WebSocket, type?: MessageType): void {
    // 소켓을 연결한다.
    this.sockets.push(socket);
    // 여기서 socket은 connectSocket쪽에서 담겨서 넘겨지고 있다.(연결하자마자 커다란 sockets에 담긴다.)
    // 연결된 소켓을 소켓 목록에 추가한다.(peer 목록에 추가)
    //   - 후에 어디랑 연결됐는지 확인할 때 등 사용한다.
    socket.on("message", (_data: string) => {
      // message 이벤트 설정
      // message 이벤트가 발생하면 로그로 남긴다.
      console.log(_data.toString());
      // console.log("message");

      const data = JSON.parse(_data.toString());
      // 1. 받은 메세지를 객체로 파싱하고,

      switch (data.type) {
        // 2. 어떤 요청이 왔는가 type으로 확인해서
        case MessageType.lastBlock: {
          // 3. 마지막 블록을 달라고 했으니까,
          const message: IMessage = {
            // type: MessageType.addBlock,
            type: MessageType.allBlock, // 모든 블록을 제대로 받았는지 확인한다.
            payload: [this.lastBlock],
            // 4. 마지막 블록은 payload에 담아서
          };
          socket.send(JSON.stringify(message));
          // 5. 보내자.
          break;
        }

        case MessageType.allBlock: {
          // 위의 const message 구문에서 보내고 아래 구문에서 받는다.
          const [newBlock]: [IBlock] = data.payload;
          const isValid: IBlock | null = this.add2Chain(newBlock);

          if (isValid !== null) break; // >> isValid가 null이 아닐 경우 => 즉, chain에 블록이 정상적으로 추가됐다.
          // 아래 구문은 isValid === null 일 경우
          const message: IMessage = {
            // chain에 block이 정상적으로 추가되지 않았을 때 전체 chain을 보내서 확인해보자.
            type: MessageType.addBlock,
            payload: this.getChain, // 전체 chain을 보낸다.
          };
          socket.send(JSON.stringify(message));
          break;
        }

        case MessageType.addBlock: {
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError === true) break;

          const isValid = this.replaceChain(data.payload);
          if (isValid.isError === true) break;
          // chain에 문제가 없다면 data를 넣어 받는 것으로,

          // 문제가 없이 끝마치면
          // 연결된 peer들에게 내가 데이터가 바뀌었음을 알린다.
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
          };

          this.broadcast(message);

          break;
        }
        case MessageType.addTx: {
          const receivedTx = data.payload;
          if (
            receivedTx ||
            this.getTxPool.find((item) => item.hash === receivedTx.hash)
          )
            break;
          this.addTxPool(receivedTx);

          const message: IMessage = {
            type: MessageType.addTx,
            payload: receivedTx,
          };
          this.broadcast(message);

          break;
        }
      }
    });

    const message: IMessage = {
      // 처음 연결 시 요청을 보내자, 마지막 블럭 주세요
      type: type | MessageType.lastBlock, // last Block을 요청
      // 요청을 보낸 사람 : type(==undefined)이 없기 때문에 MessageType.lastBlock을 요청
      payload: type ? this.getChain : [], // >> 155번째 줄 or 141번째 줄 실행
      // type이 있으면 getChain을 보내주고, 없으면 빈 배열을 보내줘라
      // this.getChain >> 연결한 상대방의 chain이 들어오게 됨
    };
    // message >> 객체
    socket.send(JSON.stringify(message));
    // 위에서 연결을 하고 msg를 보낸 것이 이쪽에서 상대방에게 보낸 것
    // message 객체이므로 message로 바로 보낼 순 없다.
    // 방금 연결한 소켓 서버에 message 이벤트를 보낸다.
  }

  listen(port: number): void {
    // 현재 로컬에서 서버를 생성, 배포한다.
    const server: WebSocketServer = new WebSocket.Server({ port });
    // 서버를 생성한다.
    // 가나슈(Ganache) 라는 개인(로컬)용 블록체인이 있다. << 네트워크 없이 진행 가능하다.
    // 이 가나슈의 초기 port 설정이 7545이다.

    server.on("connection", (socket: WebSocket) => {
      // 서버에 연결이 들어왔을 때
      console.log("socket start");
      this.connectSocket(socket);
      // 요청 보낸 사람, 매개변수인 type을 보내지 않고 있다.
      // socket을 추가한다.
    });
  }

  addToPeer(peer: string): void {
    // 상대방이 내 ip에 접속을 했을 경우
    // 소켓을 생성하고 연결한다.
    const socket: WebSocket = new WebSocket(peer);
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    socket.on("open", () => {
      // 연결 성공 시 open 이벤트가 발생한다.
      console.log("open");
      this.connectSocket(socket, MessageType.addBlock);
      // 연결에 성공하면 소켓을 추가한다.
    });
  }

  broadcast(message: IMessage) {
    this.sockets.forEach((item) => {
      item.send(JSON.stringify(message));
    });
  }
}

export default P2P;

// peer add >> ip 주소를 연결 (http://192.168.0.***:8080/peer/add) >> 상대방의 주소로 data를 보냈다는 것을 확인하는 것
//  => 비교를 했을 때
// block mine >> http 상으로만 주고 받는 상태, 상대방과 상관 없이 data를 추가하겠다.
