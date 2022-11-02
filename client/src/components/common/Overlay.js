import React from "react";
import PropTypes from "prop-types";
import useToggle from "hooks/useToggle";

const Overlay = ({ children, handleHideModal }) => {
  return (
    <div className="fixed inset-0 z-20 h-[100vh] p-10">
      <div
        className="absolute inset-0 bg-black bg-opacity-25 -z-10"
        onClick={handleHideModal}
      ></div>
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node,
};

export default Overlay;
