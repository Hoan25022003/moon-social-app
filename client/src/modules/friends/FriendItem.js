import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Tooltip } from "@mui/material";
import TextLight from "components/text/TextLight";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FriendItem = ({ src, fullName, email, status = 3, linkInfo = "/" }) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 h-[300px] border rounded-xl border-strock">
      <div className="flex flex-col items-center">
        <Avatar alt="Remy Sharp" src={src} sx={{ width: 80, height: 80 }} />
        <h4 className="mt-2 text-lg font-bold leading-6">{fullName}</h4>
        <TextLight className="mb-1">{email}</TextLight>
        {status === 1 && (
          <Tooltip title="Added friend">
            <CheckCircleIcon className="text-2xl text-primary" />
          </Tooltip>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-3">
        {status !== 1 && (
          <Button
            variant="contained"
            className="w-full p-[10px] text-base font-semibold capitalize rounded-full font-body bg-primary text-white"
          >
            Add friend
          </Button>
        )}
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
  status: PropTypes.number,
  linkInfo: PropTypes.string,
};

export default FriendItem;
