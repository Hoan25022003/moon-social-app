import BackPage from "components/common/BackPage";
import Search from "components/search/Search";
import useChangeValue from "hooks/useChangeValue";
import EmptyLayout from "layout/EmptyLayout";
import FriendItem from "modules/friends/FriendItem";
import FriendList from "modules/friends/FriendList";
import React from "react";

const FriendPage = () => {
  const { value: query, handleChange } = useChangeValue("");
  console.log(query);
  return (
    <div className="border-b border-x border-graySoft">
      <BackPage>
        <div className="flex-1 py-1">
          <Search
            placeholder="Search friend ..."
            className="py-3 text-sm"
            isSuggested={false}
            onChange={handleChange}
          ></Search>
        </div>
      </BackPage>
      {/* <FriendList className="px-5 py-3">
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
      </FriendList> */}
      <EmptyLayout
        linkImg="/img/remove-user.png"
        info="No users found in this list"
        support="Let's try again later"
        className="h-[300px] gap-y-6"
      ></EmptyLayout>
    </div>
  );
};

export default FriendPage;
