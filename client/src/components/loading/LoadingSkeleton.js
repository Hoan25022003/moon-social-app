import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col px-4 rounded-lg bg-whiteSoft">
      <div className="flex items-start justify-between mt-5 mb-3">
        <div className="flex items-center gap-x-3">
          <Skeleton variant="circular" width={42} height={42} />
          <div>
            <Skeleton
              variant="text"
              sx={{ fontSize: "15px", width: "100px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "13px", width: "120px" }}
            />
          </div>
        </div>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      <Stack spacing={0.3}>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      </Stack>
      <div className="mt-5">
        <Skeleton variant="rounded" sx={{ width: "100%" }} height={300} />
      </div>
      <div className="py-3">
        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-x-3">
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="text" sx={{ fontSize: "14px", width: "40px" }} />
          </div>
          <div className="flex items-center gap-x-3">
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="text" sx={{ fontSize: "14px", width: "40px" }} />
          </div>
          {/* <PostStatus
            hoverColor="group-hover:bg-heartColor"
            quantity={3000}
            className={like ? "text-heartColor " : "hover:text-heartColor"}
            onClick={setLike}
            title={like ? "Unlike" : "Like"}
          >
            {like ? (
              <FavoriteIcon className="text-xl text-heartColor"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="text-xl"></FavoriteBorderIcon>
            )}
          </PostStatus>
          <PostStatus
            hoverColor="group-hover:bg-thirdColor"
            className="hover:text-thirdColor"
            quantity={400}
            title="Comment"
          >
            <ChatBubbleOutlineOutlinedIcon className="text-xl"></ChatBubbleOutlineOutlinedIcon>
          </PostStatus> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
