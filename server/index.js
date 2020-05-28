var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("client"));

app.get("/index", function (req, res) {
  res.status(200).send("Hola Mundo");
});

var messages = [
  {
    id: 1,
    text: "Bienvenido al chat privado",
    nickName: "Bot",
  },
];

io.on("connection", function (socket) {
  console.log("El nodo con ip:" + socket.handshake.address + "se ha conectado");
  socket.emit("messages", messages);
  socket.on("add-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`https://chat-sockets-test.herokuapp.com: ${port}`)
);
