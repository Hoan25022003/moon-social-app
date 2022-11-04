import React from "react";
import HomeFeature from "modules/home/HomeFeature";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";

const ProfilePost = () => {
  return (
    <div className="flex flex-col px-3 my-3 gap-y-3">
      <HomeFeature linkInfo="/profile/123456"></HomeFeature>
      <PostItem type="image"></PostItem>
      <PostSkeleton></PostSkeleton>
    </div>
  );
};

export default ProfilePost;
