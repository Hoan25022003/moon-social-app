import React, { useEffect } from "react";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import useCheckLogin from "hooks/useCheckLogin";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import PostSkeleton from "components/skeleton/PostSkeleton";

const HomePage = () => {
  const { currentUser } = useCheckLogin("Home page");
  // const { listUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const { listPost, loading } = useSelector((state) => state.posts.getPost);
  return (
    <div className="py-4">
      <PostFeature
        username={currentUser?.firstName}
        avatar={currentUser?.avatar}
        linkInfo={"/profile/" + currentUser?._id}
      ></PostFeature>
      <div className="flex flex-col mt-4 gap-y-4">
        {currentUser && !loading ? (
          listPost?.length > 0 &&
          listPost.map((post) => (
            <PostItem key={post?._id} postInfo={post}></PostItem>
          ))
        ) : (
          <>
            <PostSkeleton></PostSkeleton>
            <PostSkeleton></PostSkeleton>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
