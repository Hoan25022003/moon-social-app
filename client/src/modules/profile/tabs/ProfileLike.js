import React from "react";
import EmptyLayout from "layout/EmptyLayout";

const ProfileLike = () => {
  return (
    <EmptyLayout
      linkImg="/img/profile-empty.png"
      info="This user has not liked any posts yet"
      support="Please switch to other page."
    ></EmptyLayout>
  );
};

export default ProfileLike;
