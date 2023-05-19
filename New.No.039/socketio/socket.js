const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);
  io.on("connection", (ws) => {
    // 브라우저당 하나씩 연결
    ws.on("hi1", () => {
      io.emit("message", ws.data);
    });
    // 2. 프론트엔드 (브라우저 웹 사이트)에서 message라는 이름으로 보낸 데이터를 받아서 처리한다.
    ws.on("hi", (data) => {
      ws.data = data;
      //   socket.emit("message", => 같은 이름이어야 한다.
      console.log(data);
      // 3. 위에서 콘솔로 확인한 후에 message라는 이름으로 프론트엔드에 데이터를 보낸다.
      //   ws.emit("message", data);
      // socket.on("message", (data) => 같은 이름이여야 한다.
      // 받은 메시지 다시 보내라 (프론트로) / console.log 웹 상으로 보냄
      io.emit("message", data);
      // ws.emit은 연결된 프론트엔드에게 보낸다.
      // io.emit은 연결된 모든 프론트엔드에게 보낸다. (소켓 연결된 모든 사람들에게 보낸다. ex_채팅)
      ws.broadcast.emit("message", "data");
      // 보낸 프론트엔드를 제외하고 나머지 모든 프론트엔드에 데이터를 보낸다.
    });
    ws.on("disconnect", () => {
      console.log("disconnection");
      io.emit("disconnect1", "아라라");
      // 반대쪽에서 새로고침하는 것 == 나갔다가 들어온 것으로 인식하기때문에 뜨는 것
    });
  });
};
