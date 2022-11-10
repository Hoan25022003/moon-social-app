import React from "react";
import Search from "components/search/Search";
import useChangeValue from "hooks/useChangeValue";
import FriendList from "modules/friends/FriendList";
import FriendItem from "modules/friends/FriendItem";

const ProfileFriend = () => {
  const { value, handleChange } = useChangeValue();
  return (
    <div className="px-3 py-4">
      <Search
        isSuggested={false}
        placeholder="Search friend"
        onChange={handleChange}
      ></Search>
      <FriendList className="my-3">
        <FriendItem
          src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          fullName="Hoan Do"
          email="hoan@gmail.com"
        ></FriendItem>
      </FriendList>
    </div>
  );
};

export default ProfileFriend;
