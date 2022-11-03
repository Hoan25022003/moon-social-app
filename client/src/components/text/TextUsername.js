import React from "react";

const TextUsername = ({ children, className = "" }) => {
  return <p className={`text-[15px] font-semibold ${className}`}>{children}</p>;
};

export default TextUsername;
