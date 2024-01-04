import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Chats from "./sections/Chats";
import DefChatArea from "./sections/DefChatArea";
import ChatArea from "./sections/ChatArea";
import People from "./sections/People";

function Home(props) {
  const [userName, setUserName] = useState(props.userName);
  const [chatAreaUser, setChatAreaUser] = useState(null);
  const [socket, setSocket] = useState(props.socket);
  const [middleSection, setMiddleSection] = useState("chats");

  const [dispChats, setDispChats] = useState(true);

  const changeChatAreaUser = (value) => {
    setChatAreaUser(value);
    setDispChats(false);
  };

  const [moveUserTop, setMoveUserTop] = useState("");

  const handleMoveToTop = (moveUser) => {
    setMoveUserTop(moveUser);
  };

  const selectMiddleSec = (option) => {
    setMiddleSection(option);
    setDispChats(true);
  };

  useEffect(() => {
    setSocket(props.socket);
    setUserName(props.userName);
  }, [props.userName, props.socket]);

  return (
    <div className="h-full w-full p-2 bg-[#eff6fc] flex max-md:flex-col gap-2">
      <div className="md:h-full md:w-fit max-md:w-full max-md:h-fit">
        <NavBar onSelectMiddleSec={selectMiddleSec} userName={userName} />
      </div>
      <div className="md:w-full max-md:h-full flex gap-2">
        {middleSection === "chats" ? (
          <Chats
            setChatAreaUsr={changeChatAreaUser}
            userName={userName}
            socket={socket}
            moveUserTop={moveUserTop}
            dispChats={dispChats}
            chatUser={chatAreaUser}
          />
        ) : (
          <People
            setChatAreaUsr={changeChatAreaUser}
            dispChats={dispChats}
            chatUser={chatAreaUser}
          />
        )}
        <div
          className={`w-3/4 max-md:w-full block bg-white rounded-3xl max-md:${
            dispChats ? "hidden" : "block"
          }`}>
          {chatAreaUser ? (
            <ChatArea
              chatUserName={chatAreaUser}
              userName={userName}
              socket={socket}
              moveToTop={handleMoveToTop}
              makeCall={props.makeCall}
            />
          ) : (
            <DefChatArea />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
