import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackPage from "components/common/BackPage";
import ChatItem from "modules/chats/ChatItem";
import { chatUserList } from "redux/chats/chatRequest";
import { socket } from "api/axios";
import { useLoadingContext } from "react-router-loading";
import ChatSkeleton from "components/skeleton/ChatSkeleton";
import EmptyLayout from "layout/EmptyLayout";
import { newChatList } from "redux/chats/chatSlice";
import ButtonGradient from "components/button/ButtonGradient";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const loadingContext = useLoadingContext();
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listUserActive, listChats, loading } = useSelector(
    (state) => state.chats.chatInfo
  );
  useEffect(() => {
    document.title = "Moon Chat | Moon Stars";
    dispatch(chatUserList());
    socket.connect();

    socket.on("receive-info", ({ listChat, userID }) => {
      if (userID === currentUser?._id) {
        // eslint-disable-next-line array-callback-return
        const listChatNew = listChat.map((user) => {
          if (user.show)
            return {
              ...user,
              participant: user.participant.filter((i) => i._id !== userID)[0],
            };
        });
        dispatch(newChatList(listChatNew));
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) return;
  if (!loading) loadingContext.done();
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
      <div className="px-4 py-3">
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
          {!loading ? (
            listChats?.length > 0 ? (
              listChats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  id={chat._id}
                  avatar={chat.participant.avatar}
                  createdAt={chat.latestMessage?.createdAt}
                  isActive={
                    !!listUserActive?.filter(
                      (user) => user._id === chat.participant._id
                    )[0]
                  }
                  username={
                    chat.participant.firstName + " " + chat.participant.lastName
                  }
                  latestMessage={
                    chat.latestMessage?.content
                      ? chat.latestMessage.sender === currentUser._id
                        ? "You: " + chat.latestMessage.content
                        : chat.latestMessage.content
                      : "✌️ Let's send message to get acquainted new friend"
                  }
                ></ChatItem>
              ))
            ) : (
              <EmptyLayout
                linkImg="/img/remove-user.png"
                info="No users found in this list"
                support="Let's add friend to chat"
                className="h-[300px] gap-y-6"
              >
                <div>
                  <ButtonGradient
                    onClick={() => navigate("/friends")}
                    theme={1}
                    className="w-[200px] py-5 mt-4 rounded-lg text-base font-bold"
                  >
                    Go Friend Page
                  </ButtonGradient>
                </div>
              </EmptyLayout>
            )
          ) : (
            <ChatSkeleton></ChatSkeleton>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
