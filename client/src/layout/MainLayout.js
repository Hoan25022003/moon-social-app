import React from "react";
import { Link } from "react-router-dom";
import HeaderNav from "./header/HeaderNav";
import HeaderDarkMode from "./header/HeaderDarkMode";
import HeaderUserInfo from "./header/HeaderUserInfo";

const MainLayout = () => {
  return (
    <div className="w-[1400px] mx-auto">
      <div className="fixed top-0 flex items-start w-[1400px] gap-x-5">
        <div className="h-[100vh] flex-[1] flex flex-col justify-between z-50 py-12">
          <div>
            <Link to={"/"} className="flex items-center gap-x-4">
              <img src="/moon.png" alt="" className="w-10 h-10" />
              <h3 className="text-2xl font-bold text-text2">Moon Star</h3>
            </Link>
            <HeaderNav></HeaderNav>
          </div>
          <div>
            <HeaderDarkMode></HeaderDarkMode>
            <HeaderUserInfo
              avatar="/moon.png"
              username="Hoan Do"
              email="hoan@gmail.com"
            ></HeaderUserInfo>
          </div>
        </div>
        <div className="flex-[2.5] z-10"></div>
        <div className="flex-[1.5] bg-red-500 z-50 h-12 mt-10"></div>
      </div>
      <div className="flex items-start gap-x-5">
        <div className="flex-[1]"></div>
        <div className="h-12 bg-green-400 flex-[2.5] z-50"></div>
        <div className="flex-[1.5] z-10"></div>
      </div>
    </div>
  );
};

export default MainLayout;
