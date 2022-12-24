import React from "react";
import { Button, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { socket } from "../../api/axios";

const CommentForm = ({
  placeholder = "Comment your reply about this post",
}) => {
  const { currentUser } = useSelector((state) => state.auth.login);

  const {
    register,
    reset,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const handleComment = (values) => {
    reset();
    socket.emit("sendComment", values);
  };
  return (
    <form
      onSubmit={handleSubmit(handleComment)}
      className="flex flex-col flex-1"
    >
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder={placeholder}
        autoFocus={true}
        className="px-4 py-3 border text-text2 rounded-xl border-strock"
        {...register("content", { required: true })}
      />
      <div className="my-3 text-right">
        <Button
          variant="contained"
          type="submit"
          className={`w-[100px] bg-primary rounded-full py-[6px] transition-all ${
            (!isDirty || errors?.content) && "pointer-events-none opacity-30"
          }`}
        >
          Reply
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
