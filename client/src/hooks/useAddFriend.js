import axios from "api/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFriend } from "redux/users/userRequest";

export default function useAddFriend(userID) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.users?.friend);

  // Send invitation
  const handleInvite = async () => {
    setLoadingBtn(true);
    try {
      await axios({
        method: "POST",
        url: "/friends/add/" + userID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      dispatch(userFriend(filters));
      setLoadingBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   Accept friend
  const handleAccept = async () => {
    setLoadingBtn(true);
    try {
      await axios({
        method: "PUT",
        url: "/friends/accept/" + userID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      dispatch(userFriend(filters));
      setLoadingBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   Cancel friend
  const handleCancel = async () => {
    try {
      await axios({
        method: "DELETE",
        url: "/friends/cancel/" + userID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      dispatch(userFriend(filters));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loadingBtn,
    handleInvite,
    handleAccept,
    handleCancel,
  };
}
