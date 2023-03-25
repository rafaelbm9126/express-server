const path = require("path");
// const { v4 } = require("uuid");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { control } = require("./control");

const port = process.env.PORT || 3000;

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  // console.log("a user connected");

  // control();

  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });

  socket.on("join-room", (data) => {
    room = data;
    socket.join(data);
    io.to(room).emit("set-status", table);
  });

  const table = [
    null, null, null,
    null, null, null,
    null, null, null
  ];
  let room = null;

  socket.on("get-status", () => {
    io.to(room).emit("set-status", table);
  });

  socket.on("set-move", (data) => {
    table[parseInt(data.position, 10)] = "X";
    io.to(room).emit("set-status", table);
  });

});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
