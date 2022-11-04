import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

const ProfileTabList = ({ children, listTab = [], setSearchParams }) => {
  const [value, setValue] = React.useState(listTab[0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchParams({ tab: newValue });
  };
  return (
    <div className="w-full mt-5">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {listTab.map((tab, i) => (
          <Tab value={tab} label={tab} key={i} />
        ))}
      </Tabs>
      <div className="w-full h-[1px] bg-graySoft"></div>
      {children}
    </div>
  );
};

ProfileTabList.propTypes = {
  children: PropTypes.node,
  listTab: PropTypes.array.isRequired,
  setSearchParams: PropTypes.any,
};

export default ProfileTabList;
