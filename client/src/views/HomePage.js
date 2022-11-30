import React from "react";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import useCheckLogin from "hooks/useCheckLogin";

const HomePage = () => {
  const { currentUser } = useCheckLogin("Home page");
  // const { listUsers } = useSelector((state) => state.users);
  // console.log(listUsers);
  return (
    <div className="py-4">
      <PostFeature username={currentUser?.firstName}></PostFeature>
      <div className="flex flex-col mt-4 gap-y-4">
        <PostItem></PostItem>
        <PostItem type="image"></PostItem>
      </div>
    </div>
  );
};

export default HomePage;
