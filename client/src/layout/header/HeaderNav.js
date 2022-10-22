import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ChatIcon from "@mui/icons-material/Chat";
import { NavLink } from "react-router-dom";

const listNav = [
  {
    name: "Home",
    url: "/",
    icon: <HomeIcon></HomeIcon>,
  },
  {
    name: "List friend",
    url: "/list-friend",
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
    name: "Messages",
    url: "/message",
    icon: <ChatIcon></ChatIcon>,
  },
  {
    name: "Watch",
    url: "/",
    icon: <OndemandVideoIcon></OndemandVideoIcon>,
  },
];

const HeaderNav = () => {
  return (
    <nav className="flex flex-col mt-10 gap-y-4">
      {listNav.map((nav) => (
        <NavLink
          className="flex items-center px-5 py-4 transition-colors rounded-full gap-x-3 text-text3 hover:bg-graySoft"
          to={nav.url}
          key={nav.name}
        >
          {nav.icon}
          <span className="text-base leading-6 ">{nav.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default HeaderNav;
