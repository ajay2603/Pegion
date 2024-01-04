const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userAuth = require("./src/api/userauth");
const userInfoFetch = require("./src/api/usrDetReq");
const messages = require("./src/api/messages");
const { dbConnector, clientUrl } = require("./src/const");

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);
app.use("/api/user-auth", userAuth);
app.use("/api/fetch/user-details", userInfoFetch);
app.use("/api/messages/chats", messages);

mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting to DB");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send(true);
});

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
});

const socketHandler = require("./src/sockets/socket_main");
socketHandler.setupSocketIO(io);

const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
