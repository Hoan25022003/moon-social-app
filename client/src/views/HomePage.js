import Overlay from "components/common/Overlay";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import HomeFeature from "modules/home/HomeFeature";
import PostItem from "modules/posts/PostItem";
import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* <Overlay></Overlay> */}
      <HomeFeature></HomeFeature>
      <div className="flex flex-col mt-5 gap-y-5">
        <PostItem></PostItem>
        {/* <LoadingSkeleton></LoadingSkeleton> */}
      </div>
    </div>
  );
};

export default HomePage;
