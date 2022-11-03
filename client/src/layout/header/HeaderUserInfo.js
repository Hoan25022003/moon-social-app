import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import TextLight from "components/text/TextLight";

const HeaderUserInfo = ({
  url = "/profile/123456",
  avatar,
  username,
  email,
}) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log(123);
  };
  return (
    <div className="flex items-center justify-between">
      <Link to={url} className="flex items-center gap-x-3 w-fit">
        <Avatar alt={username} src={avatar} sx={{ width: 48, height: 48 }} />
        <div>
          <h3 className="text-[15px] font-semibold">{username}</h3>
          <TextLight>{email}</TextLight>
        </div>
      </Link>
      <div>
        <MenuNav>
          <MenuNavItem
            handleExtra={() => {
              navigate({ url });
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
