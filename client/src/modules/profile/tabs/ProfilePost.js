import React from "react";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";

const ProfilePost = ({ yourSelf }) => {
  return (
    <div className="flex flex-col px-3 my-3 gap-y-3">
      {yourSelf && <PostFeature linkInfo="/profile/123456"></PostFeature>}
      <PostItem type="image"></PostItem>
      <PostSkeleton></PostSkeleton>
    </div>
  );
};

export default ProfilePost;
