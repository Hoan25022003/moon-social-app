import React from "react";
import TextHeading from "components/text/TextHeading";
import TextLight from "components/text/TextLight";

const ProfileEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-y-4">
      <img src="/img/profile-empty.png" className="w-[90px] h-[90px]" alt="" />
      <div className="text-center">
        <TextHeading className="text-lg">
          This user has not liked any posts yet
        </TextHeading>
        <TextLight>Please switch to other page.</TextLight>
      </div>
    </div>
  );
};

export default ProfileEmpty;
