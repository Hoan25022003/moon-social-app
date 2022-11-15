import React from "react";
import { useNavigate } from "react-router-dom";
import BackPage from "components/common/BackPage";
import Search from "components/search/Search";
import TextHeading from "components/text/TextHeading";
import useChangeValue from "hooks/useChangeValue";
import useTurnSwitch from "hooks/useTurnSwitch";
import FriendItem from "modules/friends/FriendItem";
import FriendList from "modules/friends/FriendList";
import PostItem from "modules/posts/PostItem";

const FilterPage = () => {
  const { value: query, handleChange } = useChangeValue("");
  const { switchTab, keyName } = useTurnSwitch("q");
  const navigate = useNavigate();
  const handleEnterKey = (e) => {
    if (e.which === 13 && query) navigate("/search?q=" + query);
  };
  return (
    <div className="border-b border-x border-graySoft">
      <BackPage turnSwitchTab={switchTab}>
        <div className="flex-1 py-1">
          <Search
            placeholder="Search in here"
            className="py-[14px] text-sm"
            onChange={handleChange}
            // value={keyName || ""}
            onKeyDown={handleEnterKey}
          ></Search>
        </div>
      </BackPage>
      <div className="flex flex-col px-5 py-4 gap-y-6">
        <div>
          <TextHeading className="mb-3">People</TextHeading>
          <FriendList>
            <FriendItem
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
            ></FriendItem>
          </FriendList>
        </div>
        <div>
          <TextHeading className="mb-3">Posts</TextHeading>
          <div className="flex flex-col gap-y-3">
            <PostItem type="image"></PostItem>
            <PostItem type="image"></PostItem>
            <PostItem type="image"></PostItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
