import FriendSkeleton from "components/skeleton/FriendSkeleton";
import useFetchMore from "hooks/useFetchMore";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const FriendList = ({ className, children, length }) => {
  const { hasMore, countItem, fetchMoreData } = useFetchMore(length, 4, 4);
  return (
    <InfiniteScroll
      className={`grid grid-cols-2 ${className} gap-x-5 gap-y-4`}
      dataLength={countItem}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<FriendSkeleton />}
      scrollableTarget="scrollableDiv"
    >
      {children}
    </InfiniteScroll>
  );
};

export default FriendList;
