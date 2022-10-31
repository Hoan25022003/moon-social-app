import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const PostMeta = ({ avatar, fullName }) => {
  return (
    <Link to={"/home"} className="flex items-center gap-x-3">
      <Avatar alt="Hoan" src={avatar} sx={{ width: 42, height: 42 }} />
      <div>
        <h3 className="text-[15px] font-semibold">{fullName}</h3>
        <p className="text-[13px] font-normal text-text4">
          22 minutes previous
        </p>
      </div>
    </Link>
  );
};

export default PostMeta;
