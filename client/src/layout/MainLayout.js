import React, { useEffect } from "react";
import { socket } from "api/axios";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SideNav from "./leftSidebar/SideNav";
import SideDarkMode from "./leftSidebar/SideDarkMode";
import SideUserInfo from "./leftSidebar/SideUserInfo";
import SideContact from "./rightSidebar/SideContact";
import SideFilter from "./rightSidebar/SideFilter";
import SideFriend from "./rightSidebar/SideFriend";
import useCheckLogin from "hooks/useCheckLogin";
import { addUserActive } from "redux/chats/chatSlice";
import SideSearchInput from "./rightSidebar/SideSearchInput";

const MainLayout = () => {
  const { currentUser } = useCheckLogin();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("client-connect", currentUser);
    socket.on("user-active", (data) => {
      dispatch(addUserActive(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="relative flex items-start justify-between w-[1200px] gap-x-8">
        <div className="sticky top-0 h-[100vh] flex-[1] flex flex-col justify-between z-50 py-8">
          <div>
            <Link to={"/home"} className="flex items-center gap-x-4">
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
        <div className="flex-[2.5] border-b border-x border-graySoft min-h-screen">
          <Outlet></Outlet>
        </div>
        <div className="sticky top-0 flex-[1.5] z-50 overflow-auto h-[100vh] py-4 scroll-custom">
          <SideSearchInput />
          <RightContainer path={location.pathname} />
        </div>
      </div>
    </div>
  );
};

const RightContainer = ({ path }) => {
  switch (path) {
    case "/friends":
      return <SideFriend></SideFriend>;

    case "/search":
      return <SideFilter></SideFilter>;

    default:
      return <SideContact></SideContact>;
  }
};

export default MainLayout;
