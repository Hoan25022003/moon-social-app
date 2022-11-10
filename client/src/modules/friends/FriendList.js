import React from "react";

const FriendList = ({ className, children }) => {
  return (
    <div className={`grid grid-cols-2 ${className} gap-x-5 gap-y-4`}>
      {children}
    </div>
  );
};

export default FriendList;
