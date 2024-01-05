import React, { useEffect, useState } from "react";

function CallRoom() {
  const [chatUser, setChatUser] = useState("ajay");
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const [isDisp, setIsDisp] = useState(true);

  const handelVidoOnOff = () => {
    setVideoOn(!videoOn);
  };

  const handelMicOnOff = () => {
    setMicOn(!micOn);
  };

  const handleDisp = () => {
    setIsDisp(!isDisp);
  };

  return (
    <div className="flex justify-center">
      <div
        className={`text-white absolute flex justify-center items-center h-[15vh] w-full bg-gradient-to-b from-black to-transparent transition-all duration-500 ${
          !isDisp ? " translate-y-[-20vh]" : " translate-y-[-5vh]"
        } `}>
        <label className=" relative top-[2vh] text-2xl logsupTxt">
          {chatUser}
        </label>
      </div>
      <video
        className=" flex h-screen w-screen bg-blue-500"
        onClick={handleDisp}></video>
      <video
        className={`absolute ${
          isDisp ? "top-[10vh]" : "top-4"
        } right-4 aspect-video md:h-24 h-20 bg-green-500 transition-all duration-500`}></video>
      <div
        className={`text-white absolute bottom-0 flex justify-center h-[20vh] w-full gap-6 bg-gradient-to-t from-black to-transparent transition-all duration-500  ${
          !isDisp ? " translate-y-[20vh]" : " translate-y-[5vh]"
        } `}>
        <div
          className={`${
            videoOn ? "bg-gray-600" : " bg-white "
          }  h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer relative bottom-[-3vh]`}
          onClick={handelVidoOnOff}>
          <span
            className={`material-symbols-outlined text-3xl font-medium ${
              videoOn ? "text-white" : "text-black"
            }`}>
            videocam_off
          </span>
        </div>
        <div className=" bg-red-500 h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer relative bottom-[-3vh]">
          <span className="material-symbols-outlined text-3xl font-medium text-white">
            phone_disabled
          </span>
        </div>
        <div
          className={`${
            micOn ? "bg-gray-600" : " bg-white "
          }  h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer relative bottom-[-3vh]`}
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
