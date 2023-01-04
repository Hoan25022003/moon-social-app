import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFriend } from "redux/users/userRequest";
import { Avatar } from "@mui/material";
import TextHeading from "components/text/TextHeading";
import TextUsername from "components/text/TextUsername";
import { Link } from "react-router-dom";

const SideContact = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    currentUser && dispatch(userFriend({ status: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const { listUsers, loading } = useSelector((state) => state.users?.friend);
  // if (listUsers) listUsers = listUsers.filter((user) => user?.status === 1);
  // console.log(listUsers, loading);
  return (
    <div className="mt-5 overflow-hidden rounded-xl bg-whiteSoft">
      <TextHeading className="p-4">User contact</TextHeading>
      <div className="flex flex-col">
        {!loading &&
          listUsers?.length > 0 &&
          listUsers.map((user) => (
            <Link
              key={user?._id}
              to={"/profile/" + user?._id}
              className="flex items-center justify-between px-4 py-3 transition-all cursor-pointer hover:bg-graySoft"
            >
              <div className="flex items-center gap-x-3">
                <Avatar
                  alt=""
                  src={user?.avatar}
                  sx={{ width: 40, height: 40 }}
                />
                <TextUsername>
                  {user?.firstName + " " + user?.lastName}
                </TextUsername>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SideContact;
