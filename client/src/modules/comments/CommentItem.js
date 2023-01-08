import React from "react";
import { useSelector } from "react-redux";
import { socket } from "api/axios";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import TextUsername from "components/text/TextUsername";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import AlertDialog from "components/alert/AlertDialog";

const CommentItem = ({ comment }) => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const { content, userID } = comment;
  const [openDialog, setOpenDialog] = React.useState(false);
  const fullName = userID?.firstName + " " + userID?.lastName;
  const handleDeleteComment = () => {
    socket.emit("deleteComment", comment._id);
  };
  return (
    <>
      <div className="flex items-start gap-x-3 ">
        <Link to={"/profile/" + userID?._id}>
          <Avatar
            src={userID?.avatar}
            alt={fullName}
            sx={{ width: 52, height: 52 }}
          />
        </Link>
        <div>
          <div className="flex items-center gap-x-1">
            <TextUsername>{fullName}</TextUsername>
            {/* <Tooltip title="Author">
              <VerifiedIcon className="text-xl text-primary" />
            </Tooltip> */}
          </div>
          <div className="flex items-start mt-1 gap-x-2">
            <h5 className="text-[15px] font-normal text-text2">{content}</h5>
            {userID?._id === currentUser?._id && (
              <Tooltip
                title="Delete comment"
                className="cursor-pointer opacity-80"
                onClick={() => setOpenDialog(true)}
              >
                <DeleteIcon className="text-xl text-iconColor" />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleExtra={handleDeleteComment}
        textConfirm="You want to delete this comment ?"
        textSupport="This comment will be removed from post"
      ></AlertDialog>
    </>
  );
};

export default CommentItem;
