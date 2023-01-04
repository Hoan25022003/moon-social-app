import React from "react";
import { useNavigate } from "react-router-dom";
import TextUsername from "components/text/TextUsername";
import ChatAvatar from "./parts/ChatAvatar";
import ChatLatestMessage from "./parts/ChatLatestMessage";

const ChatItem = ({ avatar, username, latestMessage = "", id = "1234" }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/chats/t/" + id)}
      className="flex items-center justify-between transition-all cursor-pointer rounded-xl hover:bg-whiteSoft "
    >
      <div className="flex items-start p-3 gap-x-3">
        <ChatAvatar
          avatar={avatar}
          size={54}
          alt={username}
          isActive={true}
        ></ChatAvatar>
        <div>
          <TextUsername>{username}</TextUsername>
          <ChatLatestMessage>{latestMessage}</ChatLatestMessage>
        </div>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
};

export default ChatItem;