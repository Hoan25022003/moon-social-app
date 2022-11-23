import BackPage from "components/common/BackPage";
import PostItem from "modules/posts/PostItem";
import React from "react";

const SavedPage = () => {
  return (
    <div className="border-b border-x border-graySoft ">
      <BackPage>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Saved post</h4>
          <p className="text-[13px] font-normal text-text4">12 posts</p>
        </div>
      </BackPage>
      <div className="flex flex-col p-5 gap-y-4">
        <PostItem type="image"></PostItem>
        <PostItem type="image"></PostItem>
      </div>
    </div>
  );
};

export default SavedPage;
