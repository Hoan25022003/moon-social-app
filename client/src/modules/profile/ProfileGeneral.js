import React from "react";
import PropTypes from "prop-types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CakeIcon from "@mui/icons-material/Cake";
import TextLight from "components/text/TextLight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import TextInfo from "components/text/TextInfo";

const ProfileGeneral = ({ dateJoin = "" }) => {
  return (
    <div className="grid grid-cols-2 mt-4 gap-y-2">
      <TextInfo content={"Join " + dateJoin}>
        <CalendarMonthIcon className="text-lg" />
      </TextInfo>
      <TextInfo content="Born on 25/11/2022">
        <CakeIcon className="text-lg" />
      </TextInfo>
      <TextInfo content="200 Friends">
        <PersonAddIcon className="text-lg" />
      </TextInfo>
      <TextInfo content="Work at ...">
        <BusinessIcon className="text-lg" />
      </TextInfo>
    </div>
  );
};

ProfileGeneral.propTypes = {
  dateJoin: PropTypes.any,
};

export default ProfileGeneral;
