import React from "react";
import PropTypes from "prop-types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CakeIcon from "@mui/icons-material/Cake";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import TextInfo from "components/text/TextInfo";
import DescriptionIcon from "@mui/icons-material/Description";
import parse from "html-react-parser";
import TextLight from "components/text/TextLight";

const ProfileGeneral = ({
  dateJoin = "",
  desc = "",
  friendCount = 0,
  birthday,
  workAt = "",
}) => {
  return (
    <>
      <div className="grid grid-cols-2 mt-4 gap-y-2">
        <TextInfo content={"Join " + dateJoin}>
          <CalendarMonthIcon className="text-lg" />
        </TextInfo>
        <TextInfo content={`Born on ${birthday || "Not"}`}>
          <CakeIcon className="text-lg" />
        </TextInfo>
        <TextInfo content={`${friendCount} Friends`}>
          <PersonAddIcon className="text-lg" />
        </TextInfo>
        <TextInfo content={`Work at ${workAt || "Not"}`}>
          <BusinessIcon className="text-lg" />
        </TextInfo>
      </div>
      {desc && (
        <div className="flex items-start gap-x-2">
          <TextInfo content="Description: " className="mt-2">
            <DescriptionIcon className="text-lg" />
          </TextInfo>
          <TextLight className="mt-2 leading-5">{parse(desc)}</TextLight>
        </div>
      )}
    </>
  );
};

ProfileGeneral.propTypes = {
  dateJoin: PropTypes.any,
};

export default ProfileGeneral;
