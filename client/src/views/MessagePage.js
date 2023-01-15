import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageHistory } from "redux/chats/chatRequest";
import { addMessage, removeMessage } from "redux/chats/chatSlice";
import { useParams } from "react-router-dom";
import { socket } from "api/axios";
import BackPage from "components/common/BackPage";
import MessageForm from "modules/messages/MessageForm";
import MessageProfile from "modules/messages/MessageProfile";
import MessageItem from "modules/messages/MessageItem";
import { useLoadingContext } from "react-router-loading";

const MessagePage = () => {
  const loadingContext = useLoadingContext();
  const { currentUser } = useSelector((state) => state.auth.login);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.connect();
    dispatch(messageHistory(id));

    socket.emit("join-chat", id);

    socket.on("receive-message", (data) => {
      dispatch(addMessage(data));
    });

    socket.on("receive-again", (data) => {
      dispatch(removeMessage(data));
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { listMessage, loading, participant } = useSelector(
    (state) => state.chats.messageInfo
  );
  if (!participant) return;
  if (listMessage.length > 0) document.body.scrollIntoView(false);
  if (!loading) {
    loadingContext.done();
  }
  return (
    <>
      <BackPage turnSwitchTab="/chats">
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">
            {participant.firstName + " " + participant.lastName}
          </h4>
          <p className="text-[13px] font-normal text-text4">
            {participant.isActive ? "Active" : "No Active"}
          </p>
        </div>
      </BackPage>
      <div className="flex flex-col pt-3 gap-y-5">
        <MessageProfile userInfo={participant}></MessageProfile>
        <div className="flex flex-col w-full px-5 gap-y-3">
          {!loading
            ? listMessage.length > 0 &&
              listMessage.map((mess) => (
                <MessageItem
                  key={mess._id}
                  yourself={mess.sender._id === currentUser._id}
                  messageID={mess._id}
                  senderInfo={mess.sender}
                  userID={{ yourID: currentUser?._id, userInfo: participant }}
                  fullName={mess.sender.firstName + " " + mess.sender.lastName}
                >
                  {mess.content}
                </MessageItem>
              ))
            : "Loading message"}
        </div>
        <MessageForm
          yourID={currentUser?._id}
          userInfo={participant}
        ></MessageForm>
      </div>
    </>
  );
};

export default MessagePage;
