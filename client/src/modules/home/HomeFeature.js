import { Avatar } from "@mui/material";
import React from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomeFeature = ({
  avatar = "https://images.unsplash.com/photo-1666679639559-fdb2162b3cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  username = "Hoan",
  linkInfo,
}) => {
  return (
    <div className="px-4 py-3 bg-whiteSoft rounded-xl">
      <div className="flex items-center pb-3 border-b gap-x-3 border-graySoft">
        <Link to={"/profile"}>
          <Avatar alt="" src={avatar} sx={{ width: 42, height: 42 }} />
        </Link>
        <div className="flex items-center flex-1 px-5 py-3 transition-all rounded-full cursor-pointer hover:bg-strock bg-graySoft text-text3">
          Hi {username}, what are you thinking?
        </div>
      </div>
      <div className="flex justify-between pt-3">
        <div className="flex justify-center flex-1 py-3 transition-all rounded-lg cursor-pointer hover:bg-graySoft gap-x-3 text-text3">
          <CollectionsIcon className="text-green-500"></CollectionsIcon>
          Image
        </div>
        <div className="flex justify-center flex-1 py-3 transition-all rounded-lg cursor-pointer hover:bg-graySoft gap-x-3 text-text3">
          <VideoLibraryIcon className="text-red-500"></VideoLibraryIcon>
          Video
        </div>
      </div>
    </div>
  );
};

HomeFeature.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  linkInfo: PropTypes.string,
};

export default HomeFeature;
