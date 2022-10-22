import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuItem";

const HeaderUserInfo = ({ url = "/", avatar, username, email }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log(123);
  };
  return (
    <div className="flex items-center justify-between">
      <Link to={url} className="flex items-center gap-x-4 w-fit">
        <Avatar alt={username} src={avatar} sx={{ width: 52, height: 52 }} />
        <div>
          <h3 className="text-[15px] font-semibold">{username}</h3>
          <span className="text-sm font-normal text-text4">{email}</span>
        </div>
      </Link>
      <div>
        <MenuNav>
          <MenuNavItem
            handleExtra={() => {
              navigate("/login");
            }}
          >
            My Account
          </MenuNavItem>
          <MenuNavItem handleExtra={handleSignOut}>Log Out</MenuNavItem>
        </MenuNav>
      </div>
    </div>
  );
};

HeaderUserInfo.propTypes = {
  url: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string,
};

export default HeaderUserInfo;
