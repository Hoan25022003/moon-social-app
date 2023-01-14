import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackPage from "components/common/BackPage";
import TextHeading from "components/text/TextHeading";
import useTurnSwitch from "hooks/useTurnSwitch";
import FriendItem from "modules/friends/FriendItem";
import FriendList from "modules/friends/FriendList";
import PostItem from "modules/posts/PostItem";
import EmptyLayout from "layout/EmptyLayout";
import { userFilter } from "redux/users/userRequest";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import { useLoadingContext } from "react-router-loading";

const FilterPage = () => {
  const loadingContext = useLoadingContext();
  const { switchTab, keyName } = useTurnSwitch("q");
  const [searchParams, setSearchParams] = useSearchParams("");
  const { listPost, loading: getPostLoading } = useSelector(
    (state) => state.posts.getPost
  );
  const { listUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const listQuery = searchParams.get("list") || "all";
  const commentQuery = searchParams.get("comment");
  const latestQuery = searchParams.get("latest");

  const empty = (
    <EmptyLayout
      className="py-10"
      linkImg="/img/searching.png"
      info="No results found for this keyword"
      support="Please try again later !"
    ></EmptyLayout>
  );
  const users =
    (listQuery === "people" || listQuery === "all") && listUsers?.length > 0
      ? listUsers.map((user) => (
          <FriendItem key={user._id} user={user}></FriendItem>
        ))
      : listQuery === "people" && listPost?.length === 0
      ? empty
      : null;

  const posts =
    (listQuery === "post" || listQuery === "all") && listPost.length > 0
      ? listPost.map((post) => (
          <PostItem key={post?._id} postInfo={post}></PostItem>
        ))
      : listQuery === "post" && listPost.length === 0
      ? empty
      : null;

  useEffect(() => {
    if (listQuery === "post") {
      dispatch(
        getPostList(
          `?keyword=${keyName}&comment=${
            commentQuery === "false" ? "false" : "true"
          }${latestQuery === "true" ? "&latest=true" : ""}`
        )
      );
    } else if (listQuery === "people") {
      dispatch(userFilter(keyName));
    } else {
      dispatch(userFilter(keyName));
      dispatch(
        getPostList(
          `?keyword=${keyName}&comment=${
            commentQuery === "false" ? "false" : "true"
          }`
        )
      );
    }
  }, [keyName, listQuery, commentQuery, latestQuery]);

  if (!getPostLoading) {
    loadingContext.done();
  }
  return (
    <>
      <BackPage turnSwitchTab={switchTab}>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Search</h4>
          <p className="text-[13px] font-normal text-text4">
            Have 4 result for "{keyName}"
          </p>
        </div>
      </BackPage>
      {listPost?.length === 0 && listUsers?.length === 0 ? (
        empty
      ) : (
        <div className="flex flex-col px-5 py-4 gap-y-6">
          {listQuery !== "post" ? (
            <div>
              <TextHeading className="mb-3">People</TextHeading>
              <FriendList>{users}</FriendList>
            </div>
          ) : null}
          {listQuery !== "people" ? (
            <div>
              <TextHeading className="mb-3">Posts</TextHeading>
              <div className="flex flex-col gap-y-3">{posts}</div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default FilterPage;
