import React from "react";

const ButtonRemoveAll = ({ children, className = "", onClick = () => {} }) => {
  return (
    <button
      className={`${className} px-4 py-1 text-sm font-semibold transition-all rounded-full cursor-pointer hover:bg-primary hover:bg-opacity-10 text-primary`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonRemoveAll;
