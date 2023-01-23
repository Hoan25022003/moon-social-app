import React from "react";
import parse from "html-react-parser";

const PostTheme = ({ children, theme }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${theme?.linkImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-[400px] flex items-center justify-center p-5 mt-2 rounded-lg"
    >
      <h3
        className={`text-[34px] font-bold leading-[50px] text-center ${
          theme?.textColor || "text-text1"
        }`}
      >
        {parse(children)}
      </h3>
    </div>
  );
};

export default PostTheme;
