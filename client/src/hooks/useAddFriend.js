import axios from "api/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusFriend } from "redux/users/userSlice";

export default function useAddFriend(userID = "", status) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const dispatch = useDispatch();
  // const { filters } = useSelector((state) => state.users?.friend);

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
      // dispatch(
      //   statusFriend({
      //     type: "success",
      //     message: "Sent invitation",
      //   })
      // );
      setLoadingBtn(false);
      setNewStatus(2);
    } catch (error) {
      dispatch(
        statusFriend({
          type: "error",
          message: "Error, please try again!",
        })
      );
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
      // dispatch(userFriend(filters));
      // dispatch(
      //   statusFriend({
      //     type: "success",
      //     message: "Add successful friend",
      //   })
      // );
      setLoadingBtn(false);
      setNewStatus(1);
    } catch (error) {
      console.log(error);
      dispatch(
        statusFriend({
          type: "error",
          message: "Error, please try again!",
        })
      );
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
      // dispatch(userFriend(filters));
      setNewStatus(3);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loadingBtn,
    newStatus,
    handleInvite,
    handleAccept,
    handleCancel,
  };
}
