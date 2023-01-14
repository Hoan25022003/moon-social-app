import React from "react";
import { useNavigate } from "react-router-dom";
import TextUsername from "components/text/TextUsername";
import ChatAvatar from "./parts/ChatAvatar";
import ChatLatestMessage from "./parts/ChatLatestMessage";

const ChatItem = ({
  avatar,
  username,
  latestMessage = "",
  // createdAt,
  id = "1234",
  isActive,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/chats/t/" + id)}
      className="flex items-center justify-between px-4 transition-all cursor-pointer rounded-xl hover:bg-whiteSoft "
    >
      <div className="flex items-start py-3 gap-x-5">
        <ChatAvatar
          avatar={avatar}
          size={50}
          alt={username}
          isActive={isActive}
        ></ChatAvatar>
        <div className="flex flex-col">
          <TextUsername>{username}</TextUsername>
          <ChatLatestMessage>{latestMessage}</ChatLatestMessage>
        </div>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
};

export default ChatItem;
