import React, { useState } from "react";
import useBackdropPicture from "hooks/useBackropPicture";
import ButtonGradient from "components/button/ButtonGradient";
import ModalPicture from "components/modal/ModalPicture";

const PostImage = ({ src = "" }) => {
  // const [openBackdrop, setOpenBackdrop] = useState(false);
  // const [picture, setPicture] = useState(null);
  // console.log(openBackdrop);
  // const handleShowBackdrop = () => {
  //   setOpenBackdrop(true);
  //   setPicture()
  // }
  const { openState, picture, handleShowBackdrop } = useBackdropPicture();
  return (
    <>
      <div className="relative w-full overflow-hidden group">
        <img
          src={src}
          className="object-cover w-full max-h-[500px] cursor-pointer rounded-lg"
          alt=""
        />
        <div className="absolute inset-0 transition-all duration-300 bg-white bg-opacity-0 group-hover:bg-opacity-50"></div>
        <div className="absolute -bottom-full group-hover:bottom-10 duration-300 transition-all left-1/2 w-[40%] -translate-x-2/4">
          <ButtonGradient
            className="w-full py-5 font-bold rounded-xl"
            onClick={() =>
              handleShowBackdrop([
                "https://images.unsplash.com/photo-1668613964763-90d0bd6559f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
                "https://images.unsplash.com/photo-1668595472892-57a348e65858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
                "https://images.unsplash.com/photo-1668414250091-9785b10191cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1237&q=80",
              ])
            }
          >
            See More (+22)
          </ButtonGradient>
        </div>
      </div>
      <ModalPicture openState={openState} listImg={picture}></ModalPicture>
    </>
  );
};

export default PostImage;
