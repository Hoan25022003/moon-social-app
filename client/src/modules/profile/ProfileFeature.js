import React from "react";
import useToggle from "hooks/useToggle";
import { Button, IconButton, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import SendIcon from "@mui/icons-material/Send";
import ProfileEdit from "./ProfileEdit";

const ProfileFeature = ({ yourSelf, status = 1 }) => {
  const classGeneral = "px-4 py-1 font-semibold capitalize rounded-full";
  const [toggleInvite, setToggleInvite] = useToggle(status === 2);
  const [showEdit, setShowEdit] = useToggle(false);
  return (
    <>
      {showEdit && <ProfileEdit handleHideModal={setShowEdit}></ProfileEdit>}
      <div className="flex items-center justify-end py-3 gap-x-3">
        <Tooltip title="Copy link to profile">
          <IconButton
            className="hover:bg-graySoft border-graySoft"
            aria-label="copy link"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <LinkIcon className="text-lg text-iconColor" />
          </IconButton>
        </Tooltip>

        {yourSelf ? (
          <Button
            variant="outlined"
            className={`${classGeneral} hover:bg-graySoft text-text1 border-strock`}
            onClick={setShowEdit}
          >
            Edit profile
          </Button>
        ) : status === 1 ? (
          <>
            <Tooltip title="Send Message">
              <IconButton
                className="hover:bg-graySoft border-strock"
                aria-label="send message"
              >
                <SendIcon className="text-lg text-iconColor" />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              className={`${classGeneral} hover:bg-graySoft text-primary border-primary`}
            >
              Unfriend
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className={`${classGeneral} text-white bg-primary`}
            onClick={setToggleInvite}
          >
            {toggleInvite ? "Pending" : "Add friend"}
          </Button>
        )}
      </div>
    </>
  );
};

export default ProfileFeature;
