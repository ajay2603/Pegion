const videoCalls = (socket, Io, getSocketMaps) => {
  socket.on("videoCallTo", (user) => {
    const { userName, chatUser } = user;

    if (userName === chatUser) {
      socket.emit("videoCallStat", {
        onCall: false,
        callStat: "Invalid...",
      });
    } else if (getSocketMaps().has(chatUser)) {
      socket.emit("videoCallStat", {
        onCall: true,
        callStat: "Calling...",
      });

      getSocketMaps()
        .get(chatUser)
        .forEach((sid) => {
          Io.to(sid).emit("videoCallsToRes", {
            userName: userName,
            sid: socket.id,
          });
        });
    } else {
      socket.emit("videoCallStat", {
        onCall: false,
        callStat: "User offline...",
      });
    }
  });

  socket.on("cancleCall", (users) => {
    const { userName, chatUser } = users;
    if (getSocketMaps().has(chatUser)) {
      getSocketMaps()
        .get(chatUser)
        .forEach((sid) => {
          Io.to(sid).emit("cancleCall", {
            userName: chatUser,
            chatUser: userName,
          });
        });
    }
  });

  socket.on("callDecline", (cSid) => {
    Io.to(cSid).emit("callDeclined");
  });
};

module.exports = videoCalls;
