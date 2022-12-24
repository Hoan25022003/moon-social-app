import React, { useEffect } from "react";
import Overlay from "components/common/Overlay";
import PostMeta from "./parts/PostMeta";
import ModalHeading from "components/modal/ModalHeading";
import PostAddTheme from "./create/PostAddTheme";
import PostAddImage from "./create/PostAddImage";
import ModalLine from "components/modal/ModalLine";
import AlertInfo from "components/alert/AlertInfo";
import { useSelector } from "react-redux";

const SelectPostType = ({ type }) => {
  switch (type) {
    case "image":
      return <PostAddImage></PostAddImage>;

    case "video":
      return <>Hello World</>;

    default:
      return <PostAddTheme></PostAddTheme>;
  }
};

const PostAddNew = ({ handleHideModal, type, author }) => {
  const { success } = useSelector((state) => state.posts.createPost);
  const { currentUser } = useSelector((state) => state.auth.login);
  return (
    <Overlay handleHideModal={handleHideModal}>
      {success && <AlertInfo>Create success post</AlertInfo>}
      <div className="w-[550px] mx-auto bg-white z-50 rounded-xl show-modal">
        <ModalHeading handleHideModal={handleHideModal}>
          Create new post
        </ModalHeading>
        <ModalLine />
        <div className="flex flex-col px-5 py-4">
          <PostMeta author={currentUser} showDate={false}></PostMeta>
          <SelectPostType type={type}></SelectPostType>
        </div>
      </div>
    </Overlay>
  );
};

export default PostAddNew;
