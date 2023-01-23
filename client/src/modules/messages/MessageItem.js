import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AlertDialog from "components/alert/AlertDialog";
import { socket } from "api/axios";

const MessageItem = ({
  yourself = true,
  children,
  fullName = "",
  senderInfo,
  userID = {},
  messageID,
}) => {
  const { id } = useParams();
  const { avatar, _id } = senderInfo;
  const [openDialog, setOpenDialog] = useState(false);
  const handleRemoveMessage = () => {
    socket.emit("remove-message", { chatID: id, messageID });
    socket.emit("send-info", userID);
  };
  return (
    <div
      className={`flex ${
        yourself && "flex-row-reverse"
      } items-start gap-x-2 group`}
    >
      <Link to={"/profile/" + _id} title={fullName}>
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
      {messageID && (
        <div className="flex items-center opacity-0 gap-x-1 group-hover:opacity-100">
          {yourself && (
            <Tooltip title="Delete">
              <IconButton
                onClick={() => setOpenDialog(true)}
                className="mt-1 transition-all w-7 h-7 bg-graySoft hover:bg-strock"
              >
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
      )}
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleExtra={handleRemoveMessage}
        textConfirm="Do you want to delete this message"
      ></AlertDialog>
    </div>
  );
};

export default MessageItem;
