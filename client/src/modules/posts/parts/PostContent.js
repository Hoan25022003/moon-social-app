import React from "react";
import PropTypes from "prop-types";
import useToggle from "hooks/useToggle";
import parse from "html-react-parser";

const PostContent = ({ children }) => {
  const [viewAll, setViewAll] = useToggle(false);
  return (
    <div className="text-[15px] mb-3">
      <div
        className={`font-normal leading-5 text-text1 ${
          !viewAll && "line-clamp-3"
        }`}
      >
        {parse(children)}
      </div>
      {children.length > 200 && (
        <span
          className="text-sm cursor-pointer text-text3"
          onClick={setViewAll}
        >
          {viewAll ? "Hidden" : "Read more"}
        </span>
      )}
    </div>
  );
};

PostContent.propTypes = {
  children: PropTypes.any,
};

export default PostContent;
