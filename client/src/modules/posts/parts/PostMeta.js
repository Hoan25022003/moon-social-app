import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostMeta = ({ avatar, fullName, showDate = true }) => {
  return (
    <Link to={"/home"} className="flex items-center gap-x-3 w-fit">
      <Avatar alt="Hoan" src={avatar} sx={{ width: 42, height: 42 }} />
      <div>
        <h3 className="text-[15px] font-semibold">{fullName}</h3>
        {showDate && (
          <p className="text-[13px] font-normal text-text4">
            22 minutes previous
          </p>
        )}
      </div>
    </Link>
  );
};

PostMeta.propTypes = {
  avatar: PropTypes.string,
  fullName: PropTypes.string,
};

export default PostMeta;
