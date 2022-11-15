import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";
import SearchHistory from "./SearchHistory";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Search = ({
  onChange = () => {},
  placeholder = "Search in here",
  isSuggested = true,
  className = "text-[15px]",
  ...props
}) => {
  const [focus, setFocus] = React.useState(false);

  const handleClickAway = () => {
    setFocus(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative z-50">
        <label
          className={`flex items-center w-full pl-4 overflow-hidden rounded-full ${
            focus ? "border border-primary" : "bg-whiteSoft2"
          }`}
        >
          <SearchOutlinedIcon
            className={`text-[22px] ${
              focus ? "text-primary" : "text-iconColor"
            }`}
          ></SearchOutlinedIcon>
          <input
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            className={`flex-1 px-3 py-4 bg-transparent ${className}`}
            onFocus={() => setFocus(!focus)}
            {...props}
          />
        </label>
        {isSuggested && focus && <SearchHistory></SearchHistory>}
      </div>
    </ClickAwayListener>
  );
};

Search.propTypes = {
  isSuggested: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Search;
