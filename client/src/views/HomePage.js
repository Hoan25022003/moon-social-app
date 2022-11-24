import React, { useEffect } from "react";
import axios from "api/axios";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import { getAllUser } from "redux/users/userRequest";
import { refreshLogin } from "redux/auth/authSlice";
import { createAxios } from "api/createInstance";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(currentUser, dispatch, refreshLogin);

  useEffect(() => {
    if (currentUser) {
      getAllUser(currentUser?.accessToken, axiosJWT, dispatch);
      document.title = "Home page";
    } else navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { listUsers } = useSelector((state) => state.users);
  console.log(listUsers);
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
