import React, { useEffect } from "react";
import useChangeValue from "hooks/useChangeValue";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userFriend } from "redux/users/userRequest";
import BackPage from "components/common/BackPage";
import Search from "components/search/Search";
import EmptyLayout from "layout/EmptyLayout";
import FriendItem from "modules/friends/FriendItem";
import FriendList from "modules/friends/FriendList";
import useCheckLogin from "hooks/useCheckLogin";
import FriendSkeleton from "components/skeleton/FriendSkeleton";
import { filterUser } from "redux/users/userSlice";

const FriendPage = () => {
  const { currentUser } = useCheckLogin("Add friend | Moon Stars");
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.users?.friend);
  const [searchParams, setSearchParams] = useSearchParams();
  const { value: query, handleChange } = useChangeValue(
    searchParams.get("name") || ""
  );
  useEffect(() => {
    const filterName = {
      ...filters,
      name: query,
    };
    setSearchParams(filterName);
    dispatch(filterUser(filterName));
    dispatch(userFriend(filterName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, query]);
  console.log(searchParams.get("name"));
  const { listUsers, loading } = useSelector((state) => state.users?.friend);
  if (!currentUser) return;
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
          defaultValue={query}
        ></Search>
        {loading && (
          <FriendList>
            <FriendSkeleton />
            <FriendSkeleton />
          </FriendList>
        )}
        {listUsers &&
          !loading &&
          (listUsers.length > 0 ? (
            <FriendList>
              {listUsers.map((user) => (
                <FriendItem
                  key={user?._id}
                  userID={user?._id}
                  src={user?.avatar}
                  fullName={user?.firstName + " " + user?.lastName}
                  email={user?.email}
                  linkInfo={"/profile/" + user?._id}
                  status={user?.status}
                  isSender={user?.isSender}
                ></FriendItem>
              ))}
            </FriendList>
          ) : (
            <EmptyLayout
              linkImg="/img/remove-user.png"
              info="No users found in this list"
              support="Let's try again later"
              className="h-[300px] gap-y-6"
            ></EmptyLayout>
          ))}
      </div>
    </div>
  );
};

export default FriendPage;
