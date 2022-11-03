import React from "react";
import { Link, Outlet } from "react-router-dom";
import HeaderNav from "./header/HeaderNav";
import HeaderDarkMode from "./header/HeaderDarkMode";
import HeaderUserInfo from "./header/HeaderUserInfo";
import HomeContact from "modules/home/HomeContact";

const MainLayout = () => {
  function rightElement(path) {
    switch (true) {
      case path.includes("message"):
        return <div>This is chat message</div>;

      default:
        return <HomeContact></HomeContact>;
    }
  }
  const url = window.location.href;
  if (!url) return;
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="fixed top-0 flex items-start justify-between w-[1200px] gap-x-8">
        <div className="h-[100vh] flex-[1] flex flex-col justify-between z-50 py-8">
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
              avatar="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              username="Hoan Do"
              email="hoan@gmail.com"
            ></HeaderUserInfo>
          </div>
        </div>
        <div className="flex-[2.5]"></div>
        <div className="flex-[1.5] z-50 overflow-auto h-[100vh] py-5 scroll-custom">
          {rightElement(url)}
        </div>
      </div>
      <div className="flex items-start gap-x-8">
        <div className="flex-1"></div>
        <div className="flex-[2.5] z-50 ">
          <Outlet></Outlet>
        </div>
        <div className="flex-[1.5]"></div>
      </div>
    </div>
  );
};

export default MainLayout;
