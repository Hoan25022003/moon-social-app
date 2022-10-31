import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";
import useClickOut from "hooks/useClickOut";
import SearchHistory from "./SearchHistory";

const Search = ({
  onChange = () => {},
  placeholder = "Search in here",
  isSuggested = true,
}) => {
  const [focus, setFocus] = React.useState(false);
  const { nodeRef } = useClickOut(focus, setFocus);
  return (
    <div className="relative z-50" ref={nodeRef}>
      <label
        className={`flex items-center w-full pl-4 overflow-hidden rounded-full ${
          focus ? "border border-primary" : "bg-whiteSoft2"
        }`}
      >
        <SearchOutlinedIcon
          className={`text-[22px] ${focus ? "text-primary" : "text-iconColor"}`}
        ></SearchOutlinedIcon>
        <input
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-4 text-[15px] bg-transparent"
          onFocus={() => setFocus(true)}
        />
      </label>
      {isSuggested && focus && <SearchHistory></SearchHistory>}
    </div>
  );
};

Search.propTypes = {
  isSuggested: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
