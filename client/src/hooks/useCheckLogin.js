import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRefresh } from "redux/auth/authSlice";

export default function useCheckLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = Cookies.get("tokens");
  const { currentUser } = useSelector((state) => state.auth.login);
  useEffect(() => {
    if (tokens) {
      const decodedToken = jwtDecode(tokens);
      decodedToken ? dispatch(loginRefresh(decodedToken)) : navigate("/login");
      window.scrollTo(0, 0);
    } else navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { currentUser };
}

export function useCheckUser() {
  const tokens = Cookies.get("tokens");
  const navigate = useNavigate();
  useEffect(() => {
    if (tokens) {
      const decodedToken = jwtDecode(tokens);
      decodedToken && navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
