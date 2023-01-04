import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const Dropdown = ({ children, label, defaultValue = "", handleExtra }) => {
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    // handleExtra(e.target.value);
  };
  return (
    <FormControl sx={{ borderRadius: "12px" }}>
      {/* <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={defaultValue}>
          <em>{label}</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
        {children}
      </Select> */}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  defaultValue: PropTypes.any,
  handleChange: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string,
};

export default Dropdown;
