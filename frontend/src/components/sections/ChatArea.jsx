import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import consts from "../../const";

import MessageTextBox from "./chat_area/MessageTextBox";
import MessageLeft from "./chat_area/MessageLeft";
import MessageRight from "./chat_area/MessageRight";

function ChatArea(props) {
  const userName = props.userName;
  const [chatUserName, setChatUserName] = useState(props.chatUserName);
  const [chatUserDetails, setchatUserDetails] = useState({
    firstName: "",
    lastName: "",
    profilePicPath: "",
  });

  const chatAreaRef = useRef(null);
  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  const [liveMessages, setLiveMessages] = useState([]);

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${consts.domurl}/api/fetch/user-details/chat-list-info?userName=${chatUserName}`
      );
      setchatUserDetails(response.data);
    } catch (err) {
      alert("Error occurred");
    }
  };

  const handleMoveToTop = (moveUser) => {
    props.moveToTop(moveUser);
  };

  const handleTempMessages = (msg) => {
    setLiveMessages((prevMessages) => [...prevMessages, msg]);
    setTimeout(() => {
      scrollToBottom();
    }, 10);
  };

  const handleUpdateMSGTime = (updatedMSG) => {
    setLiveMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === updatedMSG.id) {
          return { ...message, time: updatedMSG.time };
        }
        return message;
      })
    );
  };

  const handleRemoveUnSend = (msgID) => {
    setLiveMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== msgID)
    );
  };

  const [prevMessages, setPrevMessages] = useState([]);

  useEffect(() => {
    const displayPreviousMessages = async () => {
      try {
        const response = await axios.post(
          `${consts.domurl}/api/messages/chats/fetch-previous-messages`,
          {
            toUser: chatUserName,
          },
          {
            withCredentials: true,
          }
        );

        const result = response.data;

        if (result.stat && !result.err) {
          const msgs = result.messages;
          setPrevMessages(msgs);
        } else {
          alert("Data Base error\nUnable to retrive Messages.");
        }
      } catch (err) {
        console.log(err);
        alert("Error in connecting Error");
      }
      scrollToBottom();
    };
    getDetails();
    displayPreviousMessages();
    setLiveMessages([]);
  }, [chatUserName]);

  useEffect(() => {
    setChatUserName(props.chatUserName);
  }, [props.chatUserName]);

  useEffect(() => {
    getDetails();
  }, []);

  const [socket, setSocket] = useState(props.socket);

  socket.on("resLiveMsg", (res) => {
    if (chatUserName === res.to || chatUserName === res.from) {
      const liveMsgExist = (array, idToFind) => {
        return array.some((obj) => obj.id === idToFind);
      };
      if (!liveMsgExist(liveMessages, res.msg.id)) {
        setLiveMessages([...liveMessages, res.msg]);
      }
    }
  });

  useEffect(() => {
    setSocket(props.socket);
  }, [props.setSocket]);

  const makeCall = () => {
    props.makeCall(chatUserName);
  };

  return (
    <div className="h-full w-full px-2 py-4 pt-1 flex flex-col">
      <div className="flex w-full h-fit px-5 pl-7 max-sm:p-3 max-sm:pl-5 py-4 items-center gap-6 max-sm:gap-2">
        <img
          src={`${consts.domurl}${chatUserDetails.profilePicPath}`}
          className="rounded-[50%] h-12"
        />
        <div className="flex w-full h-fit flex-col">
          <div className="h-fit gap-3 items-center flex">
            <span className="text-xl font-semibold w-fit">
              {`${chatUserDetails.firstName} ${chatUserDetails.lastName}`}
            </span>
            <span className="italic font-medium text-sm w-fit">
              ({`${chatUserName}`})
            </span>
          </div>
          <span className="text-xs text-gray-500">Online</span>
        </div>
        <div className="flex w-fit h-fit justify-end text-[#9747ff] sm:gap-6 gap-2">
          <span className="material-symbols-outlined cursor-pointer ">
            call
          </span>
          <span
            className="material-symbols-outlined cursor-pointer "
            onClick={makeCall}>
            videocam
          </span>
          <span className="material-symbols-outlined cursor-pointer ">
            more_vert
          </span>
        </div>
      </div>
      <hr className="border-solid mx-3" />
      <div
        className="flex flex-col h-full p-3 overflow-y-auto"
        ref={chatAreaRef}>
        <div className="flex flex-col h-fit">
          {prevMessages.map((msg) =>
            msg.user === userName ? (
              <MessageRight key={msg.id} msg={msg} />
            ) : (
              <MessageLeft key={msg.id} msg={msg} />
            )
          )}
        </div>
        <div className="flex flex-col h-fit">
          {liveMessages.map((msg) =>
            msg.user === userName ? (
              <MessageRight key={msg.id} msg={msg} />
            ) : (
              <MessageLeft key={msg.id} msg={msg} />
            )
          )}
        </div>
      </div>
      <div className="flex h-fit w-full">
        <MessageTextBox
          userName={userName}
          chatUserName={chatUserName}
          moveToTop={handleMoveToTop}
          updateMSGTime={handleUpdateMSGTime}
          appendTempMessage={handleTempMessages}
          removeUnSendMSG={handleRemoveUnSend}
        />
      </div>
    </div>
  );
}

export default ChatArea;
