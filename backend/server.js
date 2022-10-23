const app = require("express")();
const Msg = require("./models/messages");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const connectDB = require("./config/db");
connectDB();

io.on("connection", (socket) => {
  Msg.find().then((result) => {
    socket.emit("output-messages", result);
  });
  socket.on("chat message", (msg) => {
    const message = new Msg({ msg });
    message.save().then(() => {
      io.emit("chat message", msg);
    });
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
