// HTTP 통신 : 80번 포트 사용, 클라이언트가 요청을 하고 서버가 그 요청에 대해서 응답한다.
// 요청과 응답 << 요청이 없으면 서버가 응답을 보낼 수 없지 << 서버가 클라이언트에게 마음대로 데이터나 정보 등을 보낼 수 없다.
// HTTPS 통신이랑 비교를 할 때 인증서 언급
// 이러한 방식이 아닌 서버에서도 마음대로 데이터를 보낼 수 있도록 하는 방식이 Socket 통신이다 << 보통 C++, C, Java 등으로 구현한다.
// << 프로그램에서 사용된다.
// 웹에서도 이러한 방식이 필요하다고 느껴서 만들어진 것이 Web Socket이다.
// 요즘은 거의 쓰이지 않지만 기초적인 라이브러리가 'ws'이다.
// socket은 계속 연결해주는 역할을 한다. >> 연결 작업 : 웹소켓 핸드셰이크 (send <-> on으로 주고 받음)
// 보낼때만 연결하는게 아니라 계속 연결이 되어 있는 상태 (소켓과 소켓끼리의 소통) - 웹소켓도 서버가 따로 있다.
// socket은 항상 연결해서 받았는지 브라우저 입장에서 계속 확인해야 하기 때문에 무거워져서 잘 사용하지 않는다.
// 실시간으로 확인이 가능하기에 주식과 대화창 주고 받는 것에 사용한다.

const WebSocket = require("ws");

module.exports = (server) => {
  const socket = new WebSocket.Server({ server });
  // 웹소켓 서버를 새로 만드는 과정
  // 소켓을 연결한다. << 무언가 안뜨더라도 확인이 안되더라도 연결은 계속 되어있다.
  // 데이터를 주고 받지 않아도 끊기(closer)전까진 연결되어 있음

  let count = 0;
  socket.on("connection", (ws, req) => {
    // 콜백함수 / on connection (이벤트 함수)
    // 받은 것에 있어서는 이벤트 함수로 처리
    console.log("socket start");
    ws.on("message", (msg) => {
      console.log(msg.toString());
    });
    ws.interval = setInterval(() => {
      ws.send(count++);
      //  데이터를 전송한다. << 데이터를 연결된 곳에 보낸다.
    }, 1100);
    ws.on("close", () => {
      clearInterval(ws.interval);
      console.log("disconnection");
    });
  });
};
