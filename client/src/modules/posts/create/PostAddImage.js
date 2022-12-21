import ButtonGradient from "components/button/ButtonGradient";
import PictureUpload from "components/picture/PictureUpload";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import ButtonRemoveAll from "components/button/ButtonRemoveAll";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "redux/posts/postRequest";

const PostAddImage = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      content: "",
      publicImg: null,
    },
  });
  let watchSelectedFile = watch("publicImg");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.posts.createPost);
  const [preview, setPreview] = useState([]);
  const [loadPreview, setLoadPreview] = useState(false);

  const handleSelectFile = (e) => {
    setLoadPreview(true);
    const files = e.target.files;

    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(URL.createObjectURL(files[i]));
    }

    watchSelectedFile
      ? setValue("publicImg", [...watchSelectedFile, ...e.target.files])
      : setValue("publicImg", e.target.files);
    setPreview([...preview, ...images]);
    setLoadPreview(false);
  };

  const handleDeleteFile = (i) => {
    const remainPreview = preview.filter((item, index) => index !== i);
    watchSelectedFile = Array.from(watchSelectedFile).filter(
      (item, index) => index !== i
    );
    setValue("publicImg", watchSelectedFile);
    setPreview(remainPreview);
  };

  const handleRemoveAll = () => {
    setPreview([]);
    setValue("publicImg", null);
  };
  const handlePostImage = (value) => {
    const data = { ...value, type: "image" };
    dispatch(addNewPost({ data, navigate, reset }));
  };
  return (
    <form onSubmit={handleSubmit(handlePostImage)} className="mt-3 select-none">
      <div className="max-h-[420px] overflow-auto scroll-custom">
        <TextareaAutosize
          aria-label="empty textarea"
          minRows={3}
          maxRows={8}
          placeholder="Hi Hoan, what are you thinking?"
          className="w-full mb-8 overflow-auto text-base font-normal scroll-custom"
          {...register("content")}
        />
        <div className="relative flex flex-col gap-y-5">
          {preview.length > 0 && (
            <>
              <ButtonRemoveAll
                className="absolute -translate-y-full -top-1 right-2"
                onClick={handleRemoveAll}
              >
                Remove all
              </ButtonRemoveAll>
              {preview.map((img, i) => (
                <div className="relative" key={i}>
                  <img
                    className="max-h-[250px] w-full rounded-lg object-cover"
                    src={img}
                    alt=""
                  />
                  <div
                    className={`absolute flex items-center justify-center w-8 h-8 transition-all rounded-full cursor-pointer bg-graySoft opacity-60 right-4 top-4 ${
                      loadPreview && "hidden"
                    } hover:opacity-90`}
                    onClick={() => handleDeleteFile(i)}
                  >
                    <CloseIcon className="text-xl text-text2" />
                  </div>
                </div>
              ))}
            </>
          )}
          <PictureUpload
            className={`h-[200px] flex flex-col justify-center bg-whiteSoft items-center rounded-lg ${
              loadPreview && "pointer-events-none"
            } hover:bg-graySoft`}
            name="publicImg"
            control={control}
            onChange={handleSelectFile}
            multiple={true}
          >
            {loadPreview ? (
              <div className="bg-transparent border-4 rounded-full w-14 h-14 border-secondary border-t-transparent animate-spin"></div>
            ) : (
              <>
                <img src="/img/picture.png" className="mb-3 w-14 h-14" alt="" />
                <h3 className="text-text3">Click to select image</h3>
              </>
            )}
          </PictureUpload>
        </div>
      </div>
      <ButtonGradient
        type="submit"
        isLoading={loading || loadPreview}
        className={`w-full py-3 mt-4 text-base font-bold rounded-md ${
          !isDirty && !watchSelectedFile && "pointer-events-none opacity-40"
        }`}
      >
        Post
      </ButtonGradient>
    </form>
  );
};

export default PostAddImage;
