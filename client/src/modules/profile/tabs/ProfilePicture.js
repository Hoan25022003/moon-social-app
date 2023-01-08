import React, { useState } from "react";
import { useSelector } from "react-redux";
import useBackdropPicture from "hooks/useBackropPicture";
import PictureDialog from "components/picture/PictureDialog";
import EmptyLayout from "layout/EmptyLayout";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import axios from "api/axios";
import Cookies from "js-cookie";
import AlertDialog from "components/alert/AlertDialog";

const ProfilePicture = () => {
  let {
    userInfo: { listUpload },
    yourSelf,
    error,
  } = useSelector((state) => state.users.profile);
  const { handleShowBackdrop, ...others } = useBackdropPicture();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [imageID, setImageID] = useState();
  if (!yourSelf) listUpload = listUpload.filter((item) => !item.private);
  if (error) return;
  const handleViewPicture = (i) => {
    if (listUpload.length > 0) {
      var uploads = [];
      for (const img of listUpload) uploads.push(img.link);
    }
    handleShowBackdrop(uploads);
    setPosition(i);
  };
  const handleDeleteImg = async () => {
    try {
      await axios.delete("/users/image/" + imageID, {
        data: { yourSelf },
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {listUpload.length > 0 ? (
        <div className="grid grid-cols-4 px-4 my-5 gap-x-1">
          {listUpload.map((img, i) => (
            <div
              key={img._id}
              className={`relative ${
                img.private
                  ? "pointer-events-none opacity-30"
                  : "cursor-pointer group"
              }`}
            >
              <img
                key={img._id}
                src={img.link}
                className="h-[120px] object-cover "
                alt={img.name}
              />
              <div
                className="absolute inset-0 invisible bg-black bg-opacity-30 group-hover:visible"
                onClick={() => handleViewPicture(i)}
              ></div>
              {yourSelf && (
                <div className="absolute right-1 top-1">
                  <MenuNav>
                    <MenuNavItem>Turn off public</MenuNavItem>
                    <MenuNavItem
                      handleExtra={() => {
                        setOpen(true);
                        setImageID(img._id);
                      }}
                    >
                      Delete
                    </MenuNavItem>
                  </MenuNav>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyLayout
          linkImg="/img/profile-empty.png"
          info="This user have not any public image"
          support="Please switch to other page."
        ></EmptyLayout>
      )}
      <PictureDialog position={position} {...others}></PictureDialog>
      <AlertDialog
        textConfirm="Are you sure you want to delete?"
        handleExtra={() => handleDeleteImg()}
        open={open}
        setOpen={setOpen}
      ></AlertDialog>
    </div>
  );
};

export default ProfilePicture;
