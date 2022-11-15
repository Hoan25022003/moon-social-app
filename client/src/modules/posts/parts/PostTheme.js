import React from "react";

const PostTheme = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/img/theme-fire.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-[400px] flex items-center justify-center p-5 mt-2 rounded-lg"
    >
      <h3 className="text-[34px] font-bold leading-[50px] text-center">
        Sau bao tháng ngày chờ đợi, M-TP Entertainment cuối cùng cũng đã hoàn
        thành thêm một không gian mới cho văn phòng rồi.
      </h3>
    </div>
  );
};

export default PostTheme;
