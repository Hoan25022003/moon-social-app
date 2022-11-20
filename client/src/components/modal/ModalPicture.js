import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const ModalPicture = ({ openState, listImg = [] }) => {
  const [openBackdrop, setOpenBackdrop] = openState;
  const handleClickBackdrop = (e) => {
    const classNameElement = e.target.className;
    if (
      classNameElement.includes("swiper-button-next") ||
      classNameElement.includes("swiper-button-prev") ||
      classNameElement.includes("picture-backdrop")
    )
      setOpenBackdrop(true);
    else setOpenBackdrop(false);
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
      onClick={handleClickBackdrop}
    >
      {!listImg || listImg.length === 0 ? (
        <CircularProgress color="inherit" />
      ) : (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="swiper-backdrop"
          slidesPerView={1}
          allowTouchMove={false}
        >
          {listImg.map((img) => (
            <SwiperSlide>
              <img
                src={img}
                alt=""
                className="max-h-[650px] max-w-[80%] object-cover mx-auto picture-backdrop"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Backdrop>
  );
};

ModalPicture.propTypes = {
  openState: PropTypes.any,
  picture: PropTypes.array,
};

export default ModalPicture;
