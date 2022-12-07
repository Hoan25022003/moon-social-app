import axios from "api/axios";
import Cookies from "js-cookie";
import { useState } from "react";

export default function useAddFriend(userID, status) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [statusNumber, setStatusNumber] = useState(status);

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
      setStatusNumber(2);
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
      setStatusNumber(1);
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
      setStatusNumber(3);
    } catch (error) {
      console.log(error);
    }
  };

  return { statusNumber, loadingBtn, handleInvite, handleAccept, handleCancel };
}
