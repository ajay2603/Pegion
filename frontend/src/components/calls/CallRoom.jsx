import React, { useState } from "react";

function CallRoom() {
  const [chatUser, setChatUser] = useState("ajay");
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const handelVidoOnOff = () => {
    setVideoOn(!videoOn);
  };

  const handelMicOnOff = () => {
    setMicOn(!micOn);
  };

  return (
    <div className="flex justify-center">
      <div className=" text-white absolute top-[-5vh] flex justify-center items-center h-[15vh] w-full bg-gradient-to-b from-black to-transparent">
        <label className=" relative top-[2vh] text-2xl logsupTxt">
          {chatUser}
        </label>
      </div>
      <video className=" flex h-screen w-screen bg-blue-500"></video>
      <video className=" absolute top-[10vh] right-4 aspect-video md:h-24 h-20 bg-green-500"></video>
      <div className=" flex justify-center items-center h-[15vh] w-full absolute bottom-0 gap-6">
        <div
          className={`${
            videoOn ? "bg-gray-600" : " bg-white "
          }  h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer`}
          onClick={handelVidoOnOff}>
          <span
            className={`material-symbols-outlined text-3xl font-medium ${
              videoOn ? "text-white" : "text-black"
            }`}>
            videocam_off
          </span>
        </div>
        <div className=" bg-red-500 h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer">
          <span className="material-symbols-outlined text-3xl font-medium text-white">
            phone_disabled
          </span>
        </div>
        <div
          className={`${
            micOn ? "bg-gray-600" : " bg-white "
          }  h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer`}
          onClick={handelMicOnOff}>
          <span
            className={`material-symbols-outlined text-3xl font-medium ${
              micOn ? "text-white" : "text-black"
            }`}>
            mic_off
          </span>
        </div>
      </div>
    </div>
  );
}

export default CallRoom;
