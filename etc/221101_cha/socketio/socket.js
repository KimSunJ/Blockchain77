const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);
  io.on("connection", (ws) => {
    // ws.on("hi", () => {
    //   io.emit("message", ws.data);
    // });
    ws.on("hi", (data) => {
      ws.data = data;
      console.log(data);
      io.emit("message", data);
      ws.broadcast.emit("message", "data");
    });
    ws.on("disconnect", () => {
      console.log("disconnection");
      io.emit("disconnect1", "아라라");
    });
  });
};
