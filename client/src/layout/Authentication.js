import React from "react";
import PropTypes from "prop-types";
import { theme } from "utils/constant";

const Authentication = ({ children, heading }) => {
  return (
    <div className="w-full h-[100vh] flex items-start">
      <div className="w-[1200px] mx-auto grid gap-x-8 grid-cols-[1fr,1.5fr] mt-10">
        <div className="flex flex-col gap-y-10">
          <h2 className="text-center font-bold text-primary leading-[90px] text-[50px]">
            {heading}
          </h2>
          {children}
        </div>
        <div className="mt-5">
          <div
            className="mx-auto w-[600px] h-[600px] rounded-full"
            style={{
              background: theme.linearPrimary,
            }}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src="/img/Privacy-policy-rafiki.png"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] z-50"
                alt=""
              />
              <img
                src="/img/Privacy-policy-rafiki-shadow.png"
                className="absolute top-1/2 left-1/2 -translate-x-[46%] -translate-y-[46%] inset-5 w-[480px] z-40"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.any,
};

export default Authentication;
