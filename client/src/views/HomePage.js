import React from "react";
import HomeFeature from "modules/home/HomeFeature";
import PostItem from "modules/posts/PostItem";

const HomePage = () => {
  return (
    <div className="py-4">
      <HomeFeature></HomeFeature>
      <div className="flex flex-col mt-4 gap-y-4">
        <PostItem></PostItem>
      </div>
    </div>
  );
};

export default HomePage;
