import React from "react";
import Overlay from "components/common/Overlay";
import PostMeta from "./parts/PostMeta";
import ModalHeading from "components/modal/ModalHeading";
import PostAddTheme from "./create/PostAddTheme";
import PostAddImage from "./create/PostAddImage";

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

const PostAddNew = ({ handleHideModal, type }) => {
  return (
    <Overlay handleHideModal={handleHideModal}>
      <div className="w-[550px] mx-auto bg-white z-50 rounded-xl show-modal">
        <ModalHeading handleHideModal={handleHideModal}>
          Create new post
        </ModalHeading>
        <div className="h-[1px] w-full bg-whiteSoft2"></div>
        <div className="flex flex-col px-5 py-4">
          <PostMeta
            avatar="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            fullName="Hoan Do"
            showDate={false}
          ></PostMeta>
          <SelectPostType type={type}></SelectPostType>
        </div>
      </div>
    </Overlay>
  );
};

export default PostAddNew;
