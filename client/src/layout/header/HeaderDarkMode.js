import React from "react";
import Switch from "@mui/material/Switch";

const HeaderDarkMode = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="flex items-center mb-4 gap-x-3">
      <span>Dark/Light :</span>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
};

export default HeaderDarkMode;
