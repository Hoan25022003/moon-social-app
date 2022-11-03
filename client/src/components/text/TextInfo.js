import React from "react";
import TextLight from "./TextLight";

const TextInfo = ({ children, content = "" }) => {
  return (
    <div className="flex items-start text-text3 gap-x-2">
      {children}
      <TextLight>{content}</TextLight>
    </div>
  );
};

export default TextInfo;
