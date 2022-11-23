import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import { getAllUser } from "redux/users/userRequest";
import jwtDecode from "jwt-decode";

const HomePage = () => {
  const { currentAccount } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  // const {listUsers, isFetching} = useSelector(state => state.users)
  useEffect(() => {
    if (currentAccount?.accessToken) {
      getAllUser(currentAccount?.accessToken, dispatch);
      // let expires = new Date();
      // const decodeToken = jwtDecode(currentAccount?.accessToken);
      // const timer = decodeToken.exp - decodeToken.iat;
      // expires.setTime(expires.getTime() + timer * 1000);
      // setCookie("access_token", currentAccount.accessToken, {
      //   path: "/",
      //   expires,
      // });
    }
    // else navigate("/login");
    document.title = "Home page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  !cookies?.access_token && navigate("/login");
  return (
    <div className="py-4">
      <PostFeature></PostFeature>
      <div className="flex flex-col mt-4 gap-y-4">
        <PostItem></PostItem>
        <PostItem type="image"></PostItem>
      </div>
    </div>
  );
};

export default HomePage;
