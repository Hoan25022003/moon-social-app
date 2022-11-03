import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CakeIcon from "@mui/icons-material/Cake";
import TextLight from "components/text/TextLight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import TextInfo from "components/text/TextInfo";

const ProfileGeneral = () => {
  return (
    <div className="grid grid-cols-2 mt-4 gap-y-2">
      <TextInfo content="Joined August 2022">
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

export default ProfileGeneral;
