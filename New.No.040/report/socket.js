const socket = require("socket.io");
const { Chat } = require("./models/index.js");
// socket(require('express')().listen(8080))

module.exports = (server) => {
  const io = socket(server);

  io.on("connection", (ws) => {
    Chat.findAll().then((data) => {
      ws.emit("list", { list: data });
    });

    ws.on("login", (data) => {
      ws.userId = data.id;
      ws.emit("login", { id: ws.userId });
      ws.broadcast.emit("loginInfo", { id: ws.userId });
    });

    ws.on("logout", (data) => {
      ws.emit("logout");
      ws.broadcast.emit("logoutInfo", { id: ws.userId });
      ws.userId = undefined;
    });

    ws.on("chat", async (data) => {
      try {
        if (ws.userId) {
          await Chat.create({ userId: ws.userId, text: data.text });
          io.emit("chat", { id: ws.userId, text: data.text });
        } else {
          ws.emit("chat", { text: "후아유!!" });
        }
      } catch (error) {
        ws.emit("chat", { text: "관리자 나와!!!" });
        console.error(error);
      }
    });
  });
};
