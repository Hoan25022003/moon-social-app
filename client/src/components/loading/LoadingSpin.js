import React from "react";

const LoadingSpin = () => {
  return (
    <div className="relative flex items-center justify-center lds-ring w-9 h-9">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    // <div className="mx-auto border-4 border-white rounded-full w-9 h-9 border-t-transparent animate-spin"></div>
  );
};

export default LoadingSpin;
