import React from "react";
import PropTypes from "prop-types";
import LoadingSpin from "components/loading/LoadingSpin";
import { Button } from "@mui/material";

const ButtonGradient = ({
  className,
  children,
  onClick = () => {},
  type = "button",
  isLoading = false,
}) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      className={`py-[14px] text-[22px] w-[60%] leading-9 font-semibold bg-gradient-to-r from-thirdColor to-primary rounded-xl duration-200 ${
        isLoading && "pointer-events-none opacity-40"
      } ${className}`}
    >
      {isLoading ? <LoadingSpin></LoadingSpin> : children}
    </Button>
  );
};

ButtonGradient.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ButtonGradient;
