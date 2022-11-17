import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { NavLink } from "react-router-dom";

const listNav = [
  {
    name: "Home",
    url: "/home",
    icon: <HomeIcon></HomeIcon>,
  },
  {
    name: "Friend",
    url: "/friends",
    icon: <PeopleIcon></PeopleIcon>,
  },
  {
    name: "Group",
    url: "/group",
    icon: <GroupsIcon></GroupsIcon>,
  },
  {
    name: "Saved",
    url: "/post-saved",
    icon: <BookmarkIcon></BookmarkIcon>,
  },
  {
    name: "Message",
    url: "/message",
    icon: <ChatIcon></ChatIcon>,
  },
  {
    name: "Notification",
    url: "/notify",
    icon: <NotificationsIcon></NotificationsIcon>,
  },
];

const SideNav = () => {
  const navClass =
    "flex items-center px-5 py-4 transition-colors rounded-full gap-x-3 text-text3 hover:bg-graySoft";
  return (
    <nav className="flex flex-col mt-10 gap-y-4">
      {listNav.map((nav) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? `${navClass} nav-active` : navClass
          }
          to={nav.url}
          key={nav.name}
        >
          {nav.icon}
          <span className="text-base leading-6 capitalize">{nav.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SideNav;
