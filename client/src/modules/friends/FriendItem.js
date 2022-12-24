import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import TextLight from "components/text/TextLight";
import FriendStatus from "./FriendStatus";

const FriendItem = ({
  src,
  fullName,
  email,
  status = 3,
  isSender = true,
  linkInfo = "/",
  userID = "",
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 h-[300px] border rounded-xl border-strock">
      <div className="flex flex-col items-center">
        <Avatar alt={fullName} src={src} sx={{ width: 80, height: 80 }} />
        <h4 className="mt-2 text-lg font-bold leading-6">{fullName}</h4>
        <TextLight className="mb-1">{email}</TextLight>
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <FriendStatus
          status={status}
          isSender={isSender}
          userID={userID}
        ></FriendStatus>
        <Link to={linkInfo}>
          <Button
            variant="outlined"
            className="w-full p-[10px] text-base font-semibold capitalize rounded-full font-body border-primary text-primary"
          >
            View Info
          </Button>
        </Link>
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
