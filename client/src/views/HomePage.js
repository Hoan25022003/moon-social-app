import React, { useEffect } from "react";
import useFetchMore from "hooks/useFetchMore";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";
import PostList from "modules/posts/PostList";

const HomePage = () => {
<<<<<<< HEAD
  const { currentUser } = useCheckLogin("Home page");
  // const { listUsers } = useSelector((state) => state.users);
=======
  const { currentUser } = useSelector((state) => state.auth.login);
>>>>>>> f74b3da1616f2dbd47e212826f2a4b3a0c1471e7
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Home Page | Moon Stars";
    dispatch(getPostList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const { listPost, loading } = useSelector((state) => state.posts.getPost);
  const { hasMore, countItem, fetchMoreData } = useFetchMore(listPost?.length);
  return (
    <div className="p-3">
      <PostFeature
        username={currentUser?.firstName}
        avatar={currentUser?.avatar}
        linkInfo={"/profile/" + currentUser?._id}
      ></PostFeature>
      {listPost?.length > 0 && (
        <PostList dataLength={countItem} next={fetchMoreData} hasMore={hasMore}>
          {currentUser && !loading ? (
            listPost.map(
              (post, i) =>
                i < countItem && (
                  <PostItem key={post?._id} postInfo={post}></PostItem>
                )
            )
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </PostList>
      )}
    </div>
  );
};

export default HomePage;
