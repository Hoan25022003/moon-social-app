import React from "react";
import useChangeValue from "hooks/useChangeValue";
import BackPage from "components/common/BackPage";
import Search from "components/search/Search";
import EmptyLayout from "layout/EmptyLayout";
import FriendItem from "modules/friends/FriendItem";
import FriendList from "modules/friends/FriendList";

const FriendPage = () => {
  const { value: query, handleChange } = useChangeValue("");
  return (
    <div className="border-b border-x border-graySoft">
      <BackPage>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Add friend</h4>
          <p className="text-[13px] font-normal text-text4">69 friends</p>
        </div>
      </BackPage>
      <div className="flex flex-col px-5 py-3 gap-y-4">
        <Search
          onChange={handleChange}
          placeholder="Search username"
          isSuggested={false}
          className="py-[14px]"
          icon="user"
        ></Search>
        <FriendList>
          <FriendItem
            src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            fullName="Hoan Do"
            email="hoan@gmail.com"
          ></FriendItem>
          <FriendItem
            src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            fullName="Hoan Do"
            email="hoan@gmail.com"
          ></FriendItem>
          <FriendItem
            src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            fullName="Huy Do"
            email="huy@gmail.com"
          ></FriendItem>
        </FriendList>
      </div>
      {/* <EmptyLayout
        linkImg="/img/remove-user.png"
        info="No users found in this list"
        support="Let's try again later"
        className="h-[300px] gap-y-6"
      ></EmptyLayout> */}
    </div>
  );
};

export default FriendPage;
