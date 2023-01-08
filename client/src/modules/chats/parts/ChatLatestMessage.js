import React from "react";

const ChatLatestMessage = ({ children }) => {
  return (
    <span className="text-sm font-normal leading-6 text-text3 line-clamp-1">
      {children}
    </span>
  );
};

export default ChatLatestMessage;
