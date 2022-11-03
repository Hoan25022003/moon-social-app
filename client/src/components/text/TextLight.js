import React from "react";

const TextLight = ({ children, className = "" }) => {
  return (
    <span className={`text-sm font-normal text-text3 ${className}`}>
      {children}
    </span>
  );
};

export default TextLight;
