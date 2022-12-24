import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import useCheckLogin from "hooks/useCheckLogin";
import BackPage from "components/common/BackPage";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";

const SavedPage = () => {
  const { currentUser } = useCheckLogin("Post saved | Moon Stars");
  const dispatch = useDispatch();
  useEffect(() => {
    currentUser && dispatch(getPostList(`/${currentUser._id}?by=saved`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const { listPost, loading } = useSelector((state) => state.posts.getPost);
  if (!currentUser) return;
  return (
    <div className="border-b border-x border-graySoft ">
      <BackPage>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Saved post</h4>
          <p className="text-[13px] font-normal text-text4">12 posts</p>
        </div>
      </BackPage>
      <div className="flex flex-col p-5 gap-y-4">
        {loading ? (
          <>
            <PostSkeleton></PostSkeleton>
            <PostSkeleton></PostSkeleton>
          </>
        ) : (
          listPost?.length > 0 &&
          listPost.map((post) => (
            <PostItem key={post._id} postInfo={post}></PostItem>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedPage;
