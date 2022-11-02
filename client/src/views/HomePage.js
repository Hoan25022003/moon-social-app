import React from "react";
import useToggle from "hooks/useToggle";
import Overlay from "components/common/Overlay";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import HomeFeature from "modules/home/HomeFeature";
import PostAddNew from "modules/posts/PostAddNew";
import PostItem from "modules/posts/PostItem";

const HomePage = () => {
  return (
    <div>
      <HomeFeature></HomeFeature>
      <div className="flex flex-col mt-4 gap-y-5">
        <PostItem></PostItem>
        {/* <LoadingSkeleton></LoadingSkeleton> */}
      </div>
    </div>
  );
};

export default HomePage;
