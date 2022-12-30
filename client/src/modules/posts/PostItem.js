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
import CommentFeature from "modules/comments/CommentFeature";
import axios from "api/axios";
import Cookies from "js-cookie";

const PostItem = ({ postInfo }) => {
  const {
    _id,
    isLiked,
    saved,
    content,
    theme,
    authorID,
    type,
    listImg,
    listHeart,
  } = postInfo;
  const [like, setLike] = useToggle(isLiked);
  const [modalComment, setModalComment] = useToggle(false);
  const [countLike, setCountLike] = React.useState(listHeart.length);
  const handleLiked = async () => {
    try {
      setLike();
      await axios({
        method: "POST",
        url: "/posts/heart/" + _id,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      like ? setCountLike((c) => c - 1) : setCountLike((c) => c + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col px-4 rounded-xl bg-whiteSoft">
        <div className="flex items-start justify-between mt-5 mb-3">
          <PostMeta timer="22 minutes previous" author={authorID}></PostMeta>
          <PostSaved isSaved={saved} postID={_id}></PostSaved>
        </div>
        {type === "theme" ? (
          <PostTheme theme={theme}>{content}</PostTheme>
        ) : (
          <>
            <PostContent>{content}</PostContent>
            <PostImage src={listImg[0]} listImg={listImg}></PostImage>
          </>
        )}
        <div className="py-3 ">
          <div className="flex items-center gap-x-10">
            <PostStatus
              hoverColor="group-hover:bg-heartColor group-hover:text-heartColor"
              quantity={countLike}
              textColor={
                like
                  ? "text-heartColor"
                  : "group-hover:text-heartColor transition-colors"
              }
              onClick={handleLiked}
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
              onClick={setModalComment}
            >
              <ChatBubbleOutlineOutlinedIcon className="text-xl"></ChatBubbleOutlineOutlinedIcon>
            </PostStatus>
          </div>
        </div>
      </div>
      {modalComment && (
        <CommentFeature
          modalComment={modalComment}
          handleHideModal={setModalComment}
          post={postInfo}
        ></CommentFeature>
      )}
    </>
  );
};

export default PostItem;
