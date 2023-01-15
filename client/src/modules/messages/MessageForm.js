import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
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
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const handleChatMessage = (values) => {
    socket.emit("send-message", { ...values, chatID: id, sender: yourID });
    reset({
      content: "",
    });
    socket.emit("send-info", { yourID, userInfo });
  };
  return (
    <form
      className={`flex items-center w-full gap-x-3 px-5 py-3 sticky bottom-0 left-0 bg-white bg-opacity-95`}
      onSubmit={handleSubmit(handleChatMessage)}
    >
      <TextareaAutosize
        minRows={1}
        // maxRows={5}
        placeholder="Type message in here"
        autoFocus={true}
        name="content"
        className="w-full px-4 py-3 text-sm transition-all border border-none rounded-3xl text-text2 bg-whiteSoft focus:bg-graySoft"
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
