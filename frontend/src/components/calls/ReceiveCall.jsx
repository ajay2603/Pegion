import React from "react";

import consts from "../../const"

function ReceiveCall() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center flex-col gap-[10vh] bg-[#eff6fc]">
      <div className="logsupTxt text-xl font-medium text-gray-700">Calling</div>
      <div className="min-h-[120px] min-w-[120px] w-[120px] h-[120px]  rounded-[50%] overflow-hidden border-4 border-solid border-[#b1b1b1]">
        <img
          src={`${consts.domurl}/profile_pics/def_profile.jpg`}
          className="h-fit w-fit"
        />
      </div>
      <div className="w-fit h-fit flex flex-col items-center gap-6 text-gray-700">
        <h1 className="w-[90vw] inline-flex h-fit text-center text-ellipsis text-4xl logsupTxt font-medium justify-center">
          Ajay Jampana
        </h1>
        <label className="w-fit logsupTxt text-lg font-medium">(ajay)</label>
      </div>
      <div className="flex gap-20">
        <div className=" bg-green-500 h-16 w-16 flex justify-center items-center rounded-[50%]">
          <span className="material-symbols-outlined text-3xl font-medium text-white">
            call
          </span>
        </div>
        <div className=" bg-red-500 h-16 w-16 flex justify-center items-center rounded-[50%]">
          <span className="material-symbols-outlined text-3xl font-medium text-white">
            phone_disabled
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReceiveCall;
