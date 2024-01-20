import React, { useState, useEffect } from "react";
import axios from "axios";

import consts from "../../const";
import { Socket } from "socket.io-client";

function ReceiveCall(props) {
  const [socket, setSocket] = useState(props.socket);
  const [userName, setUserName] = useState(props.userName);

  const [chatUser, setChatUser] = useState(props.chatUser);
  const [callStat, setCallStat] = useState("Call from...");
  const [chatSocketId, setChatScoketId] = useState(props.cSid);
  const [chatPeerId, setChatPeerId] = useState(props.cPid);

  const [chatUserDetails, setchatUserDetails] = useState({
    firstName: "",
    lastName: "",
    profilePicPath: "",
  });

  const cancleCall = () => {
    setCallStat(null);
    setChatPeerId(null);
    setChatUser(null);
    setChatScoketId(null);
    setchatUserDetails(null);
    props.cancleCall();
  };

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${consts.domurl}/api/fetch/user-details/chat-list-info?userName=${chatUser}`
      );
      setchatUserDetails(response.data);
    } catch (err) {
      console.log(err);
      alert("Error occurred");
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  socket.on("callDeclined", () => {
    cancleCall();
  });

  socket.on("callCancled", () => {
    setCallStat("Call cancled");
    setTimeout(() => {
      cancleCall();
    }, 1500);
  });

  const handleDecline = () => {
    socket.emit("declineCall", { userName: userName, cSid: chatSocketId });
    cancleCall();
  };

  const handleAnswer = () => {
    props.answerCall(props);
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center flex-col gap-[10vh] bg-[#eff6fc]">
      <div className="logsupTxt text-xl font-medium text-gray-700">
        {callStat}
      </div>
      <div className="min-h-[120px] min-w-[120px] w-[120px] h-[120px]  rounded-[50%] overflow-hidden border-4 border-solid border-[#b1b1b1]">
        <img
          src={`${consts.domurl}${chatUserDetails.profilePicPath}`}
          className="h-fit w-fit"
        />
      </div>
      <div className="w-fit h-fit flex flex-col items-center gap-6 text-gray-700">
        <h1 className="w-[90vw] inline-flex h-fit text-center text-ellipsis text-4xl logsupTxt font-medium justify-center">
          {`${chatUserDetails.firstName} ${chatUserDetails.lastName}`}
        </h1>
        <label className="w-fit logsupTxt text-lg font-medium">
          ({`${chatUser}`})
        </label>
      </div>
      <div className="flex gap-20">
        <div
          className=" bg-green-500 h-16 w-16 flex justify-center items-center rounded-[50%] cursor-pointer"
          onClick={handleAnswer}>
          <span className="material-symbols-outlined text-3xl font-medium text-white">
            call
          </span>
        </div>
        <div
          className=" bg-red-500 h-16 w-16 flex justify-center items-center rounded-[50%] cursor-pointer"
          onClick={handleDecline}>
          <span className="material-symbols-outlined text-3xl font-medium text-white">
            phone_disabled
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReceiveCall;
