import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import TextUsername from "components/text/TextUsername";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import AlertDialog from "components/alert/AlertDialog";

const CommentItem = ({ linkInfo = "" }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleDeleteComment = () => {
    console.log(123);
  };
  return (
    <>
      <div className="flex items-start gap-x-3 ">
        <Link to={linkInfo}>
          <Avatar
            src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            alt="Hoan Do"
            sx={{ width: 52, height: 52 }}
          />
        </Link>
        <div>
          <div className="flex items-center gap-x-2">
            <TextUsername>Huy Do</TextUsername>
            <Tooltip title="Author">
              <VerifiedIcon className="text-xl text-primary" />
            </Tooltip>
          </div>
          <h5 className="text-[15px] font-normal text-text2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
            praesentium reiciendis labore consequatur iste sit mollitia. Harum
            asperiores quam at totam natus, labore voluptas tenetur accusantium,
            possimus dolore officiis praesentium!
          </h5>
        </div>
        <Tooltip
          title="Delete comment"
          className="pointer-events-none opacity-30"
          onClick={setOpenDialog}
        >
          <DeleteIcon className="text-xl text-iconColor" />
        </Tooltip>
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
