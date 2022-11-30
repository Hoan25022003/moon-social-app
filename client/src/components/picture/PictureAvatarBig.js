import React from "react";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

const PictureAvatarBig = ({
  className = "",
  avatar,
  size = 130,
  alt,
  children,
  onClick = () => {},
}) => {
  return (
    <div
      className={`absolute bottom-0 p-1 bg-white rounded-full cursor-pointer left-5 translate-y-2/4 ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar alt={alt} src={avatar} sx={{ width: size, height: size }} />
        {children}
      </div>
    </div>
  );
};

PictureAvatarBig.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  avatar: PropTypes.string.isRequired,
  size: PropTypes.number,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

export default PictureAvatarBig;
