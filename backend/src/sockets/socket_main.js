const { authSessionLogin } = require("../functions/auth");
const socketMaps = new Map();
const videoCall = require("./video_calls");
const { addNewFcmToken } = require("../firebase/fcmmap");

let socketIo;

const getSocketMap = () => socketMaps;

const handleClientConnection = async ({ socket, userName, logID }) => {
  try {
    const authResult = await authSessionLogin(userName, logID);

    if (!authResult.stat) {
      socket.emit("errMsg", "Error in connecting to sockets.");
      socket.disconnect();
      return;
    }

    console.log("Connected to socket");
    try {
      const existIDs = socketMaps.get(userName);
      if (existIDs) {
        existIDs.push(socket.id);
      } else {
        socketMaps.set(userName, [socket.id]);
      }
    } catch (err) {
      print(err);
    } finally {
      const fcmToken = socket.handshake.query.fcmToken;
      if (fcmToken) {
        addNewFcmToken(userName, fcmToken);
      }
    }
  } catch (error) {
    console.error("Error occurred during authentication or connection:", error);
    socket.emit("errMsg", "An error occurred during connection.");
    socket.disconnect();
  }
};

const setupSocketIO = (io) => {
  socketIo = io;

  io.on("connection", (socket) => {
    const { userName, logID } = socket.handshake.query;
    handleClientConnection({ socket, userName, logID });

    videoCall(socket, io, getSocketMap);

    socket.on("disconnect", () => {
      console.log("Disconnected");
      const existingIDs = socketMaps.get(userName);
      if (existingIDs) {
        const index = existingIDs.indexOf(socket.id);
        if (index !== -1) {
          existingIDs.splice(index, 1);
          if (existingIDs.length === 0) {
            socketMaps.delete(userName);
          }
        }
      }
    });
  });
};

module.exports = {
  setupSocketIO,
  socketMaps,
  getSocketIoInstance: () => socketIo,
};
