import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { socket } from "api/axios";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  content: yup.string().required(),
});

const MessageForm = ({ yourID, userInfo }) => {
  const {
    register,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const handleChatMessage = (values) => {
    socket.emit("send-message", { ...values, chatID: id, sender: yourID });
    reset({
      content: "",
    });
  };
  const handleTypingChat = (e) => {
    if (e.key !== "Backspace" && e.key !== "Alt" && e.key !== "Tab")
      socket.emit("typing-message", id);
  };
  return (
    <form
      className={`flex items-center w-full gap-x-3 px-5 py-3 sticky bottom-0 left-0 bg-white bg-opacity-95`}
      onSubmit={handleSubmit(handleChatMessage)}
      autoComplete="off"
    >
      {/* <TextareaAutosize
        minRows={1}
        maxRows={5}
        placeholder="Type message in here"
        autoFocus={true}
        name="content"
        className="w-full px-4 py-3 text-sm transition-all border border-none rounded-3xl text-text2 bg-whiteSoft focus:bg-graySoft"
        {...register("content")}
      /> */}
      <input
        type="text"
        placeholder="Type message in here"
        autoFocus={true}
        name="content"
        className="w-full px-4 py-3 text-sm transition-all border border-none rounded-3xl text-text2 bg-whiteSoft focus:bg-graySoft"
        onKeyDown={handleTypingChat}
        {...register("content")}
      />
      <button
        className={`flex items-center justify-center p-2 transition-all bg-transparent rounded-full cursor-pointer hover:bg-graySoft ${
          !isDirty && "pointer-events-none"
        }`}
      >
        <SendIcon className="text-2xl text-primary" />
      </button>
    </form>
  );
};

export default MessageForm;
