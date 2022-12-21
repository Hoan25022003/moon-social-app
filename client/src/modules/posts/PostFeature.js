import { Avatar } from "@mui/material";
import React from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useToggle from "hooks/useToggle";
import PostAddNew from "modules/posts/PostAddNew";

const PostFeature = ({ linkInfo, username, avatar }) => {
  const [showModal, setShowModal] = useToggle(false);
  const [postType, setPostType] = React.useState("");
  // const { avatar, firstName, lastName } = currentUser;
  // console.log(avatar);
  return (
    <div className="px-4 py-3 bg-whiteSoft rounded-xl">
      {showModal && (
        <PostAddNew handleHideModal={setShowModal} type={postType}></PostAddNew>
      )}
      <div className="flex items-center pb-3 border-b gap-x-3 border-graySoft">
        <Link to={linkInfo}>
          <Avatar alt="" src={avatar} sx={{ width: 42, height: 42 }} />
        </Link>
        <div
          className="flex items-center flex-1 px-5 py-3 transition-all rounded-full cursor-pointer hover:bg-strock bg-graySoft text-text3"
          onClick={() => {
            setShowModal(true);
            setPostType("");
          }}
        >
          Hi {username}, what are you thinking?
        </div>
      </div>
      <div className="flex justify-between pt-3">
        <div
          className="flex justify-center flex-1 py-3 transition-all rounded-lg cursor-pointer hover:bg-graySoft gap-x-3 text-text3"
          onClick={() => {
            setShowModal(true);
            setPostType("image");
          }}
        >
          <CollectionsIcon className="text-green-500"></CollectionsIcon>
          Image
        </div>
        <div
          className="flex justify-center flex-1 py-3 transition-all rounded-lg cursor-pointer hover:bg-graySoft gap-x-3 text-text3"
          onClick={() => {
            setShowModal(true);
            setPostType("video");
          }}
        >
          <VideoLibraryIcon className="text-red-500"></VideoLibraryIcon>
          Video
        </div>
      </div>
    </div>
  );
};

PostFeature.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  linkInfo: PropTypes.string,
};

export default PostFeature;
