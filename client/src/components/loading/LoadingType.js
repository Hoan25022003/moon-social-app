import React from "react";

const LoadingType = ({ message = "" }) => {
  return (
    <div className="flex items-center ml-3 gap-x-9">
      <div className="typing-loader w-[6px] h-[6px]"></div>
      <span className="text-[15px] text-text3">{message}</span>
    </div>
  );
};

export default LoadingType;
