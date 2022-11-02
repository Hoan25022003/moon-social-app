import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { listTheme } from "utils/constant";
import ButtonGradient from "components/button/ButtonGradient";
import { useForm } from "react-hook-form";

const PostAddTheme = () => {
  const [selectTheme, setSelectTheme] = React.useState("default");
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });
  const handleAddPost = (value) => {
    console.log({ ...value, theme: selectTheme });
  };
  return (
    <form onSubmit={handleSubmit(handleAddPost)} className="mt-3">
      <div className="relative min-h-[200px]">
        {selectTheme === "default" ? (
          <textarea
            className="w-full min-h-[140px] text-xl font-medium scroll-custom bg-transparent"
            placeholder="Hi Hoan, what are you thinking?"
            {...register("content")}
          ></textarea>
        ) : (
          <div className="relative w-full max-h-[300px] overflow-hidden rounded-xl scroll-custom">
            <img src={selectTheme?.linkImg} alt="" />
            <textarea
              className={`absolute w-full min-h-[220px] scroll-custom p-4 text-xl font-medium text-center bg-transparent top-5 ${selectTheme?.textColor}`}
              placeholder="Hi Hoan, what are you thinking?"
              {...register("content")}
            ></textarea>
          </div>
        )}
        <div className="absolute left-0 w-full px-5 bottom-2">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
          >
            <SwiperSlide>
              <div
                className={`h-10 rounded-md cursor-pointer bg-graySoft ${
                  selectTheme === "default" && "theme-active"
                }`}
                onClick={(e) => setSelectTheme("default")}
              ></div>
            </SwiperSlide>
            {listTheme.map((theme, i) => (
              <SwiperSlide key={i}>
                <img
                  src={theme.linkImg}
                  className={`object-cover w-full h-10 rounded-md cursor-pointer ${
                    selectTheme.linkImg === theme.linkImg && "theme-active"
                  }`}
                  alt=""
                  onClick={(e) => setSelectTheme(theme)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <ButtonGradient
        type="submit"
        isLoading={isSubmitting}
        className={`w-full py-3 mt-4 text-base font-bold rounded-md ${
          !isDirty && "pointer-events-none opacity-40"
        }`}
      >
        Post
      </ButtonGradient>
    </form>
  );
};

export default PostAddTheme;
