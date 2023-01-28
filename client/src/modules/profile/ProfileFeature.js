import React from "react";
import useToggle from "hooks/useToggle";
import { Button, IconButton, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import SendIcon from "@mui/icons-material/Send";
import ProfileEdit from "./ProfileEdit";
import FriendStatus from "modules/friends/FriendStatus";
import { useNavigate, useParams } from "react-router-dom";

const ProfileFeature = ({ yourSelf, status = 3, isSender = true, chatID }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classGeneral = "px-4 py-1 font-semibold";
  const [showEdit, setShowEdit] = useToggle(false);
  return (
    <>
      {showEdit && <ProfileEdit handleHideModal={setShowEdit}></ProfileEdit>}
      <div className="flex items-center justify-end py-3 gap-x-3">
        <Tooltip title="Copy link to profile">
          <IconButton
            className="hover:bg-graySoft"
            style={{ border: "1px solid #ddd" }}
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
            className={`${classGeneral} rounded-full capitalize hover:bg-graySoft text-text1 border-strock`}
            onClick={setShowEdit}
          >
            Edit profile
          </Button>
        ) : (
          <>
            {status === 1 && chatID && (
              <Tooltip
                title="Send Message"
                onClick={() => navigate("/chats/t/" + chatID?._id)}
              >
                <IconButton
                  className="hover:bg-graySoft"
                  style={{ border: "1px solid #ddd" }}
                  aria-label="send message"
                >
                  <SendIcon className="text-lg text-iconColor" />
                </IconButton>
              </Tooltip>
            )}
            <FriendStatus
              isSender={isSender}
              status={status}
              userID={id}
              className={classGeneral}
            ></FriendStatus>
          </>
        )}
      </div>
    </>
  );
};

// status === 1 ? (
//   <>
//     <Tooltip title="Send Message">
//       <IconButton
//         className="hover:bg-graySoft border-strock"
//         aria-label="send message"
//       >
//         <SendIcon className="text-lg text-iconColor" />
//       </IconButton>
//     </Tooltip>
//     <Button
//       variant="outlined"
//       className={`${classGeneral} hover:bg-graySoft text-primary border-primary`}
//     >
//       Unfriend
//     </Button>
//   </>
// ) : (
//   <Button
//     variant="contained"
//     className={`${classGeneral} text-white bg-primary`}
//     onClick={setToggleInvite}
//   >
//     {toggleInvite ? "Pending" : "Add friend"}
//   </Button>
// )

export default ProfileFeature;
