import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";
import DropdownMenu from "./DropdownMenu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ClickAwayListener } from "@mui/material";

const Dropdown = ({ children, label, value }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setToggleDropdown(false)}>
      <div
        className={`relative w-full px-5 py-4 bg-transparent border cursor-pointer rounded-xl transition-all ${
          toggleDropdown ? "border-primary" : "border-strock"
        }`}
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <div className="flex items-center justify-between">
          <span className={`text-base ${value ? "text-text2" : "text-text4"}`}>
            {value || label}
          </span>
          {toggleDropdown ? (
            <ArrowDropUpIcon className="text-text3" />
          ) : (
            <ArrowDropDownIcon className="text-text3" />
          )}
        </div>
        {toggleDropdown && <DropdownMenu>{children}</DropdownMenu>}
      </div>
    </ClickAwayListener>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

export default Dropdown;
