import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import TextLight from "components/text/TextLight";
import FriendStatus from "./FriendStatus";
import TextUsername from "components/text/TextUsername";

const FriendItem = ({
  user: {
    avatar,
    email,
    status = 3,
    isSender = true,
    linkInfo = "/",
    userID = "",
    firstName,
    lastName,
  },
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 h-[280px] border rounded-xl border-strock">
      <Link to={linkInfo} className="flex flex-col items-center">
        <Avatar alt={avatar} src={avatar} sx={{ width: 80, height: 80 }} />
        <TextUsername type="bold" className="mt-2 text-lg">
          {firstName + " " + lastName}
        </TextUsername>
        <TextLight className="mb-1">{email}</TextLight>
      </Link>
      <div className="flex flex-col w-full gap-y-2">
        <FriendStatus
          className="w-full p-[10px] text-base font-semibold"
          status={status}
          isSender={isSender}
          userID={userID}
        ></FriendStatus>
      </div>
    </div>
  );
};

FriendItem.propTypes = {
  src: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isSender: PropTypes.bool,
  status: PropTypes.number,
  linkInfo: PropTypes.string,
};

export default FriendItem;
