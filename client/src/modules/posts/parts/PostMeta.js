import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextUsername from "components/text/TextUsername";

const PostMeta = ({
  avatar,
  fullName,
  showDate = true,
  sizeAvatar = 42,
  timer,
}) => {
  return (
    <Link to={"/home"} className="flex items-center gap-x-3 w-fit">
      <Avatar
        alt="Hoan"
        src={avatar}
        sx={{ width: sizeAvatar, height: sizeAvatar }}
      />
      <div>
        <TextUsername>{fullName}</TextUsername>
        {showDate && (
          <p className="text-[13px] font-normal text-text4">{timer}</p>
        )}
      </div>
    </Link>
  );
};

PostMeta.propTypes = {
  avatar: PropTypes.string,
  fullName: PropTypes.string,
  showDate: PropTypes.bool,
  timer: PropTypes.any,
};

export default PostMeta;
