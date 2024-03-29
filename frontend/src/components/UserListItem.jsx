import React, { useState, useEffect } from "react";
import axios from "axios";
import consts from "../const";

function UserListItem(props) {
  const userName = props.userName;

  const [chatUser, setChatUser] = useState(props.chatUser);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    profilePicPath: "",
  });

  const returnUserName = () => {
    props.onClickGetUsr(userName);
  };

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${consts.domurl}/api/fetch/user-details/chat-list-info?userName=${userName}`
      );
      setUserDetails(response.data);
    } catch (err) {
      alert("Error occurred");
    }
  };

  useState(() => {
    getDetails();
  }, []);

  useEffect(() => {
    setChatUser(props.chatUser);
  }, [props.chatUser]);

  return (
    <div
      className={`flex w-full h-fit px-2 hover:cursor-pointer ${
        chatUser === userName ? "bg-[#e5e5e5]" : ""
      }`}
      onClick={returnUserName}>
      <div className="flex items-center w-full gap-4 px-2 h-14">
        <img
          src={consts.domurl + userDetails.profilePicPath}
          className={`h-9 rounded-[50%] ${
            chatUser === userName
              ? " border-2 border-solid border-[#6b7280]"
              : ""
          }`}
        />
        <div className="flex flex-col w-full">
          <h1 className="overflow-hidden font-medium whitespace-nowrap text-ellipsis">
            {userName != props.me ? `${userDetails.firstName} ${userDetails.lastName}` : 'Me'}
          </h1>
          <h1 className="text-xs italic font-medium text-slate-700">
            {`${userName}`}
          </h1>
        </div>
        {/*<div className="rounded-[50%] min-w-[23px] min-h-[20px] flex justify-center items-center bg-[#f24e1e] font-semibold text-white">
          1
        </div>*/}
      </div>
      <hr className="m-2 border-solid border-1" />
    </div>
  );
}

export default UserListItem;
