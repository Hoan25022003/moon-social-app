import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SideNav from "./leftSidebar/SideNav";
import SideDarkMode from "./leftSidebar/SideDarkMode";
import SideUserInfo from "./leftSidebar/SideUserInfo";
import SideContact from "./rightSidebar/SideContact";
import SideFilter from "./rightSidebar/SideFilter";
import useChangeValue from "hooks/useChangeValue";
import Search from "components/search/Search";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const location = useLocation();
  const { value: query, handleChange } = useChangeValue("", 0);
  const { currentUser } = useSelector((state) => state.auth.login);
  const navigate = useNavigate();
  const handleEnterKey = (e) => {
    if (e.which === 13 && query) navigate("/search?q=" + query);
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="relative flex items-start justify-between w-[1200px] gap-x-8">
        <div className="sticky top-0 h-[100vh] flex-[1] flex flex-col justify-between z-50 py-8">
          <div>
            <Link to={"/"} className="flex items-center gap-x-4">
              <img src="/moon.png" alt="" className="w-10 h-10" />
              <h3 className="text-2xl font-bold text-text2">Moon Star</h3>
            </Link>
            <SideNav></SideNav>
          </div>
          <div>
            <SideDarkMode></SideDarkMode>
            <SideUserInfo
              avatar={currentUser?.avatar}
              username={currentUser?.firstName + " " + currentUser?.lastName}
              email={currentUser?.email}
              url={"/profile/" + currentUser?._id}
            ></SideUserInfo>
          </div>
        </div>
        <div className="flex-[2.5]">
          <Outlet></Outlet>
        </div>
        <div className="sticky top-0 flex-[1.5] z-50 overflow-auto h-[100vh] py-4 scroll-custom">
          <Search onChange={handleChange} onKeyDown={handleEnterKey}></Search>
          <RightContainer path={location.pathname} />
        </div>
      </div>
      {/* <div className="flex items-start gap-x-8">
        <div className="flex-[1]"></div>
        <div className="flex-[2.5] z-10">
          <Outlet></Outlet>
        </div>
        <div className="flex-[1.5]"></div>
      </div> */}
    </div>
  );
};

const RightContainer = ({ path }) => {
  switch (path) {
    case "/message":
      return <div>This is chat message</div>;

    case "/friends":
      return <div>This is friends page</div>;

    case "/search":
      return <SideFilter></SideFilter>;

    default:
      return <SideContact></SideContact>;
  }
};

export default MainLayout;
