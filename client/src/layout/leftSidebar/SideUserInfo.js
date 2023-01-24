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
import { Skeleton } from "@mui/material";

const SideUserInfo = ({
  url = "/profile/",
  avatar,
  username = "",
  email = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth.login);
  const handleLogout = () => {
    logoutUser(dispatch);
    socket.emit("logout-active", currentUser);
  };
  return (
    <div className="flex items-center justify-between">
      <Link to={url} className="flex items-center gap-x-3 w-fit">
        {avatar ? (
          <Avatar alt={username} src={avatar} sx={{ width: 48, height: 48 }} />
        ) : (
          <Skeleton variant="circular" width={48} height={48} />
        )}
        <div>
          {username ? (
            <h3 className="text-[15px] font-semibold">{username || ""}</h3>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "15px", width: "50px" }} />
          )}
          {email ? (
            <TextLight>
              {email?.length > 15 ? email.slice(0, 15) + "..." : email}
            </TextLight>
          ) : (
            <Skeleton
              variant="text"
              sx={{ fontSize: "14px", width: "100px" }}
            />
          )}
        </div>
      </Link>
      <div>
        <MenuNav>
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
};

export default SideUserInfo;
