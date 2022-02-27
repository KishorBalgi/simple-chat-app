const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// Socket.io
io.on("connection", (socket) => {
  //   Send new user joined:
  io.emit("user joined", socket.id);
  //   Send Chat:
  socket.on("chat message", (msg) => {
    io.emit("chat message", { msg, id: socket.id });
  });
  //   User Disconnected:
  socket.on("disconnect", () => {
    io.emit("user left", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
