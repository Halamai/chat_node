const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const Chat = require("./shema.js");

server.listen(process.env.PORT || 3000, function () {
  console.log("Server running in port 3000");
});

app.use(express.static(__dirname + "/public"));

const users = {};

io.sockets.on("connection", async (client) => {
  const broadcast = (event, data) => {
    client.emit(event, data);
    client.broadcast.emit(event, data);
  };

  broadcast("user", users);

  client.emit("initMessages", await Chat.find());

  client.on("message", (message) => {
    Chat.create({ name: message.name, message: message.message });
    if (users[client.id] !== message.name) {
      users[client.id] = message.name;
      broadcast("user", users);
    }
    broadcast("message", message);
  });

  client.on("disconnect", () => {
    delete users[client.id];
    client.broadcast.emit("user", users);
  });
});
