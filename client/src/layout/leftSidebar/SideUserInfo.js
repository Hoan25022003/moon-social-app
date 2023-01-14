import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "redux/auth/authRequest";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import TextLight from "components/text/TextLight";
import { socket } from "api/axios";

const SideUserInfo = ({ url = "/profile/", avatar, username, email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth.login);
  // console.log(avatar);
  const handleLogout = () => {
    logoutUser(dispatch);
    socket.emit("logout-active", currentUser);
  };
  return (
    <div className="flex items-center justify-between">
      <Link to={url} className="flex items-center gap-x-3 w-fit">
        <Avatar
          alt={username || ""}
          src={avatar}
          sx={{ width: 48, height: 48 }}
        />
        <div>
          <h3 className="text-[15px] font-semibold">{username || ""}</h3>
          <TextLight>{email || "@gmail.com"}</TextLight>
        </div>
      </Link>
      <div>
        <MenuNav styleCoordinate="translate3d(80px, -74.4px, 0px)">
          <MenuNavItem handleExtra={() => navigate(url)}>
            Change password
          </MenuNavItem>
          <MenuNavItem handleExtra={handleLogout}>Log out</MenuNavItem>
        </MenuNav>
      </div>
    </div>
  );
};

SideUserInfo.propTypes = {
  url: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  email: PropTypes.string,
};

export default SideUserInfo;
