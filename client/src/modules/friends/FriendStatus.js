import { Button, CircularProgress } from "@mui/material";
import useAddFriend from "hooks/useAddFriend";
import React from "react";

const FriendStatus = ({ status, isSender, userID }) => {
  const classGeneral =
    "w-full p-[10px] text-base font-semibold capitalize rounded-full font-body";
  const { loadingBtn, handleInvite, handleCancel, handleAccept } =
    useAddFriend(userID);
  switch (status) {
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

export default FriendStatus;
