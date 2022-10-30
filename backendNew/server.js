const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const user = require("./controllers/users");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Msg = require("./models/message");

const app = express();
const httpServer = createServer(app);
connectDB();
// socket.io
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
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
httpServer.listen(port, () => console.log(`Server running on port ${port}`));

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", user.router);
