import { Avatar } from "@mui/material";
import TextUsername from "components/text/TextUsername";
import React from "react";

const MessageProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <Avatar
        src="/uploads/avatar-man.png"
        sx={{ width: 100, height: 100 }}
      ></Avatar>
      <TextUsername className="mt-2 text-xl" type="bold">
        Hoan Do
      </TextUsername>
      <span className="mt-1 text-base font-normal leading-5 text-text3">
        hoan@gmail.com
      </span>
    </div>
  );
};

export default MessageProfile;
