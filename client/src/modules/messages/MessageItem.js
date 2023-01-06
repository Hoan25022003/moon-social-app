import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const MessageItem = ({
  yourself = true,
  children,
  avatar = "/uploads/avatar-man.png",
}) => {
  return (
    <div
      className={`flex ${
        yourself && "flex-row-reverse"
      } items-start gap-x-2 group`}
    >
      <Link to={"/"}>
        <Avatar
          src={avatar}
          style={{ width: 20, height: 20 }}
          className="mt-2"
        ></Avatar>
      </Link>
      <div
        className={`px-3 py-2 font-normal text-[15px] rounded-xl ${
          yourself ? "bg-primary text-white" : "bg-graySoft text-text1"
        } max-w-[70%]`}
      >
        {children}
      </div>
      <div className="flex items-center opacity-0 gap-x-1 group-hover:opacity-100">
        {yourself && (
          <Tooltip title="Delete">
            <IconButton className="mt-1 transition-all w-7 h-7 bg-graySoft hover:bg-strock">
              <DeleteIcon className="text-base text-text3" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Like">
          <IconButton className="mt-1 transition-all w-7 h-7 bg-graySoft hover:bg-strock">
            <FavoriteIcon className="text-base text-text3" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageItem;
