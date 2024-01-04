import React from "react";

import img from "../assets/pigeon-flying.gif";
import loading from "../assets/loadingGIF.gif";
function Loading() {
  return (
    <div className=" flex flex-col w-screen h-screen justify-center items-center gap-6 bg-[#eff6fc]">
      <h1 className="text-4xl logsupTxt font-semibold text-[#5e3df3]">Pigeon</h1>
      <img src={img} className=" h-64" />
      <div className=" flex gap-5">
        <span className="text-[#5e3df3] w-fit text-3xl logsupTxt font-medium">Loading</span>
        <img src={loading} className=" h-10 w-fit relative top-5" />
      </div>
    </div>
  );
}

export default Loading;
