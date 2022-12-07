import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BackPage = ({ children, turnSwitchTab }) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 flex items-center px-3 py-1 bg-white bg-opacity-50 z-[100] gap-x-5">
      <div
        className="flex items-center justify-center transition-colors bg-transparent rounded-full cursor-pointer w-9 h-9 hover:bg-graySoft"
        onClick={() => navigate(turnSwitchTab || "/home")}
      >
        <ArrowBackIcon className="text-xl text-text1"></ArrowBackIcon>
      </div>
      {children}
    </div>
  );
};

BackPage.propTypes = {
  children: PropTypes.node,
  turnSwitchTab: PropTypes.number,
};

export default BackPage;
