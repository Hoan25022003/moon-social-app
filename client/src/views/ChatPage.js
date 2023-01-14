import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackPage from "components/common/BackPage";
import ChatItem from "modules/chats/ChatItem";
import { chatUserList } from "redux/chats/chatRequest";
import { socket } from "api/axios";

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const { listUserActive, listChats, loading } = useSelector(
    (state) => state.chats.chatInfo
  );
  useEffect(() => {
    document.title = "Moon Chat | Moon Stars";
    socket.connect();
    dispatch(chatUserList());
    socket.on("receive-info", (userID) => {
      if (userID === currentUser._id) dispatch(chatUserList());
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (!currentUser) return;
  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-2">
          <h4 className="text-lg font-bold">Moon Chat</h4>
          <p className="text-[13px] font-normal text-text4">
            {listChats?.length} friends
          </p>
        </div>
      </BackPage>
      <div className="px-5 py-3">
        {/* <div className="grid grid-cols-5 mb-3 gap-x-2">
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
        </div> */}
        <div className="flex flex-col">
          {!loading
            ? listChats?.length > 0 &&
              listChats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  id={chat._id}
                  avatar={chat.participant.avatar}
                  // createdAt={chat.latestMessage?.createdAt}
                  isActive={
                    !!listUserActive?.filter(
                      (user) => user._id === chat.participant._id
                    )[0]
                  }
                  username={
                    chat.participant.firstName + " " + chat.participant.lastName
                  }
                  latestMessage={
                    chat.latestMessage?.content ||
                    "✌️ Let's send message to get acquainted new friend"
                  }
                ></ChatItem>
              ))
            : "Loading"}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
