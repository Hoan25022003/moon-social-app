import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackPage from "components/common/BackPage";
import TextHeading from "components/text/TextHeading";
import useTurnSwitch from "hooks/useTurnSwitch";
import FriendItem from "modules/friends/FriendItem";
import FriendList from "modules/friends/FriendList";
import PostItem from "modules/posts/PostItem";
import EmptyLayout from "layout/EmptyLayout";

const FilterPage = () => {
  const { switchTab, keyName } = useTurnSwitch("q");
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("list") || "all");
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
      <EmptyLayout
        className="py-10"
        linkImg="/img/searching.png"
        info="No results found for this keyword"
        support="Please try again later !"
      ></EmptyLayout>
      <div className="flex flex-col px-5 py-4 gap-y-6">
        <div>
          <TextHeading className="mb-3">People</TextHeading>
          <FriendList>
            {/* <FriendItem
              src="https://images.unsplash.com/photo-1661347561118-dafef99402ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              fullName="Micheal Jackson"
              email="micheal@gmail.com"
              status={3}
            ></FriendItem>
            <FriendItem
              src="https://images.unsplash.com/photo-1668260933046-e7a5420c5c99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              fullName="Edelmans"
              email="edelmans@gmail.com"
              status={1}
            ></FriendItem> */}
          </FriendList>
        </div>
        <div>
          <TextHeading className="mb-3">Posts</TextHeading>
          <div className="flex flex-col gap-y-3">
            {/* <PostItem type="image"></PostItem>
            <PostItem type="image"></PostItem>
            <PostItem type="image"></PostItem> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
