import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackPage from "components/common/BackPage";
import TextUsername from "components/text/TextUsername";
import ChatItem from "modules/chats/ChatItem";
import ChatAvatar from "modules/chats/parts/ChatAvatar";

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Moon Chat | Moon Stars";
  }, [currentUser]);
  if (!currentUser) return;
  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-2">
          <h4 className="text-lg font-bold">Moon Chat</h4>
          <p className="text-[13px] font-normal text-text4">
            12 user | 20 group
          </p>
        </div>
      </BackPage>
      <div className="px-5 py-3">
        <div className="grid grid-cols-5 mb-3 gap-x-2">
          <div
            onClick={() => navigate("/")}
            className="flex flex-col items-center p-2 rounded-lg cursor-pointer gap-y-1 hover:bg-whiteSoft"
          >
            <ChatAvatar
              avatar={"uploads/avatar-man.png"}
              isActive={true}
              alt="Hoan Do"
            ></ChatAvatar>
            <TextUsername className="line-clamp-2">Hoan Do</TextUsername>
          </div>
        </div>
        <div className="flex flex-col">
          <ChatItem
            avatar="uploads/avatar-man.png"
            username="Do Hoan"
            latestMessage="You: Hello guys"
          ></ChatItem>
          <ChatItem
            avatar="uploads/avatar-man.png"
            username="Do Hoan"
            latestMessage="You: Hello guys"
          ></ChatItem>
          <ChatItem
            avatar="uploads/avatar-man.png"
            username="Do Hoan"
            latestMessage="You: Hello guys"
          ></ChatItem>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
