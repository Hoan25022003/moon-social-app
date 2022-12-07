import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, CircularProgress } from "@mui/material";
import TextLight from "components/text/TextLight";
import PropTypes from "prop-types";
import useAddFriend from "hooks/useAddFriend";

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

const FriendStatus = ({ status, isSender, userID }) => {
  const classGeneral =
    "w-full p-[10px] text-base font-semibold capitalize rounded-full font-body";
  const { statusNumber, loadingBtn, handleInvite, handleCancel, handleAccept } =
    useAddFriend(userID, status);
  switch (statusNumber) {
    case 1:
      return (
        <Button
          variant="contained"
          className={classGeneral + "  bg-strock text-text1"}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      );

    case 2: {
      if (!isSender)
        return (
          <div className="grid grid-cols-2 gap-x-2">
            <Button
              variant="contained"
              className={`${classGeneral} bg-primary text-white ${
                loadingBtn && "pointer-events-none"
              }`}
              onClick={handleAccept}
            >
              {loadingBtn ? (
                <CircularProgress
                  style={{ width: "24px", height: "24px" }}
                  className="text-whiteSoft2 opacity-80"
                />
              ) : (
                "Accept"
              )}
            </Button>
            <Button
              variant="contained"
              className={classGeneral + "  bg-strock text-text1"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        );
      return (
        <Button
          variant="contained"
          className={classGeneral + " bg-primary text-white"}
          onClick={handleCancel}
        >
          Waiting
        </Button>
      );
    }

    default:
      return (
        <Button
          variant="contained"
          className={`${classGeneral} bg-primary text-white ${
            loadingBtn && "pointer-events-none"
          }`}
          onClick={handleInvite}
        >
          {loadingBtn ? (
            <CircularProgress
              style={{ width: "24px", height: "24px" }}
              className="text-whiteSoft2 opacity-80"
            />
          ) : (
            "Add friend"
          )}
        </Button>
      );
  }
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
