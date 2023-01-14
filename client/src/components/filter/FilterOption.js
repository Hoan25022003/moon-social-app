import React from "react";
import TextHeading from "components/text/TextHeading";

const FilterOption = ({ heading, children, className }) => {
  return (
    <div
      className={`px-4 py-3 mt-5 border border-graySoft rounded-xl ${className}`}
    >
      <TextHeading>{heading}</TextHeading>
      <div className="flex flex-col my-3 gap-y-1">{children}</div>
    </div>
  );
};

export default FilterOption;
