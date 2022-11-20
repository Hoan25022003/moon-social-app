import React from "react";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";

const HomePage = () => {
  return (
    <div className="py-4">
      <PostFeature></PostFeature>
      <div className="flex flex-col mt-4 gap-y-4">
        <PostItem></PostItem>
        <PostItem type="image"></PostItem>
      </div>
    </div>
  );
};

export default HomePage;
