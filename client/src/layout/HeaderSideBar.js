import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ChatIcon from "@mui/icons-material/Chat";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";

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

const HeaderSideBar = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="w-[1400px] mx-auto">
      <div className="px-6 py-12 h-[100vh] w-[25%] flex flex-col justify-between fixed top-0 z-50">
        <div>
          <Link to={"/"} className="flex items-center gap-x-4">
            <img src="/moon.png" alt="" className="w-10 h-10" />
            <h3 className="text-2xl font-bold text-text2">Moon Star</h3>
          </Link>
          <nav className="flex flex-col mt-10 gap-y-4">
            {listNav.map((nav) => (
              <NavLink
                className="flex items-center p-4 transition-colors rounded-lg gap-x-3 text-text3 hover:bg-slate-200"
                to={nav.url}
              >
                {nav.icon}
                <span className="text-base leading-6 ">{nav.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div>
          <div className="flex items-center mb-4 gap-x-3">
            <span>Dark/Light :</span>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <Link to={"/"} className="flex items-center gap-x-4 w-fit">
            <Avatar
              alt="Moon Star"
              src="/moon.png"
              sx={{ width: 52, height: 52 }}
            />
            <div>
              <h3 className="text-[15px] font-semibold">Micheal Oliver</h3>
              <span className="text-sm font-normal text-text4">
                hoan@gmail.com
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderSideBar;
