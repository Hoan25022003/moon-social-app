import React, { useEffect } from "react";
import { socket } from "api/axios";
import { Button, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const CommentForm = ({
  placeholder = "Comment your reply about this post",
  emitTyping,
  emitStopTyping,
  isTyping,
}) => {
  const {
    register,
    reset,
    watch,
    formState: { isDirty, errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const handleComment = (values) => {
    socket.emit("sendComment", values);
    reset();
  };
  const content = watch("content");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (content?.length > 0) {
        emitTyping();
      }
    }, 3000);

    const timer2 = setTimeout(() => {
      emitStopTyping();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

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
        className="px-4 py-3 transition-all border text-text2 rounded-xl border-strock focus:border-primary"
        {...register("content", { required: true })}
      />
      <div className="my-3 text-right">
        <Button
          variant="contained"
          type="submit"
          className={`w-[100px] bg-primary rounded-full py-[6px] transition-all ${
            isSubmitting && "pointer-events-none bg-opacity-30"
          } ${
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
