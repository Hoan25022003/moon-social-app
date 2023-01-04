import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import useCheckLogin from "hooks/useCheckLogin";
import BackPage from "components/common/BackPage";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";
import useFetchMore from "hooks/useFetchMore";
import PostList from "modules/posts/PostList";

const SavedPage = () => {
  const { currentUser } = useCheckLogin("Post saved | Moon Stars");
  const dispatch = useDispatch();
  useEffect(() => {
    currentUser && dispatch(getPostList(`/${currentUser._id}?by=saved`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const { listPost, loading } = useSelector((state) => state.posts.getPost);
  const { hasMore, countItem, fetchMoreData } = useFetchMore(listPost?.length);
  if (!currentUser) return;
  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-2">
          <h4 className="text-lg font-bold">Saved post</h4>
          <p className="text-[13px] font-normal text-text4">12 posts</p>
        </div>
      </BackPage>
      <PostList dataLength={countItem} next={fetchMoreData} hasMore={hasMore}>
        {loading ? (
          <>
            <PostSkeleton></PostSkeleton>
            <PostSkeleton></PostSkeleton>
          </>
        ) : (
          listPost?.length > 0 &&
          listPost.map(
            (post, i) =>
              i < countItem && (
                <PostItem key={post._id} postInfo={post}></PostItem>
              )
          )
        )}
      </PostList>
    </>
  );
};

export default SavedPage;
