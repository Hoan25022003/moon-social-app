import React from "react";
import useToggle from "hooks/useToggle";
import PostContent from "./parts/PostContent";
import PostImage from "./parts/PostImage";
import PostStatus from "./parts/PostStatus";
import PostMeta from "./parts/PostMeta";
import PostSaved from "./parts/PostSaved";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PostTheme from "./parts/PostTheme";

const PostItem = ({ type = "theme" }) => {
  const [like, setLike] = useToggle(false);
  return (
    <div className="flex flex-col px-4 rounded-xl bg-whiteSoft">
      <div className="flex items-start justify-between mt-5 mb-3">
        <PostMeta
          avatar="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          fullName="Hoan Do"
        ></PostMeta>
        <PostSaved></PostSaved>
      </div>
      {type === "theme" ? (
        <PostTheme></PostTheme>
      ) : (
        <>
          <PostContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolor
            eligendi esse enim quod molestiae commodi, porro consequatur
            laboriosam consequuntur blanditiis dolorem ducimus doloribus, illo
            laudantium suscipit error. Mollitia, quisquam!
          </PostContent>
          <PostImage src="https://images.unsplash.com/photo-1666787031139-61a0e22e0c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"></PostImage>
        </>
      )}
      <div className="py-3 ">
        <div className="flex items-center gap-x-10">
          <PostStatus
            hoverColor="group-hover:bg-heartColor group-hover:text-heartColor"
            quantity={3000}
            textColor={
              like
                ? "text-heartColor"
                : "group-hover:text-heartColor transition-colors"
            }
            onClick={setLike}
            title={like ? "Unlike" : "Like"}
          >
            {like ? (
              <FavoriteIcon className="text-xl text-heartColor heart-active"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="text-xl heart-active"></FavoriteBorderIcon>
            )}
          </PostStatus>
          <PostStatus
            hoverColor="group-hover:bg-thirdColor group-hover:text-thirdColor"
            textColor="group-hover:text-thirdColor"
            quantity={400}
            title="Comment"
          >
            <ChatBubbleOutlineOutlinedIcon className="text-xl"></ChatBubbleOutlineOutlinedIcon>
          </PostStatus>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
