import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";

const MessageForm = () => {
  const {
    register,
    formState: { isDirty },
    handleSubmit,
  } = useForm();
  const handleChatMessage = (values) => {
    console.log(values);
  };
  return (
    <form
      className="flex items-end w-full gap-x-3"
      onSubmit={handleSubmit(handleChatMessage)}
    >
      <TextareaAutosize
        aria-label="empty textarea"
        minRows={1}
        maxRows={4}
        placeholder="Type message in here"
        autoFocus={true}
        className="w-full px-4 py-3 overflow-auto text-sm transition-all border border-none h-fit rounded-3xl text-text2 bg-whiteSoft focus:bg-graySoft"
        {...register("message")}
      ></TextareaAutosize>
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
