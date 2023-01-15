import React from "react";

const DropdownItem = ({ children, className = "", onClick = () => {} }) => {
  return (
    <li
      className={`px-5 py-2 transition-all cursor-pointer hover:bg-graySoft ${className}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
