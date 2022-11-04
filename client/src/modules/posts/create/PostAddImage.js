import ButtonGradient from "components/button/ButtonGradient";
import ImageUpload from "components/upload/ImageUpload";
import React from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const PostAddImage = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const handlePostImage = (value) => {
    console.log(value);
  };
  return (
    <form onSubmit={handleSubmit(handlePostImage)} className="mt-3 select-none">
      <TextareaAutosize
        aria-label="empty textarea"
        maxRows={8}
        placeholder="Hi Hoan, what are you thinking?"
        className="w-full mb-8 overflow-auto text-base font-normal scroll-custom"
        {...register("content")}
      />
      <ImageUpload
        className="h-[200px] flex flex-col justify-center bg-whiteSoft items-center rounded-lg hover:bg-graySoft"
        name="image"
        control={control}
      >
        <img src="/img/picture.png" className="mb-3 w-14 h-14" alt="" />
        <h3 className="text-text3">Click to select image</h3>
      </ImageUpload>
      <ButtonGradient
        type="submit"
        isLoading={isSubmitting}
        className={`w-full py-3 mt-4 text-base font-bold rounded-md ${
          !isDirty && "pointer-events-none opacity-40"
        }`}
      >
        Post
      </ButtonGradient>
    </form>
  );
};

export default PostAddImage;
