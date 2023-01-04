import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import Overlay from "components/common/Overlay";
import ModalHeading from "components/modal/ModalHeading";
import PostMeta from "modules/posts/parts/PostMeta";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import ModalLine from "components/modal/ModalLine";
import CommentItem from "./CommentItem";
import { socket } from "api/axios";
import { getCommentList } from "redux/comments/commentRequest";
import { deleteComment, newComment } from "redux/comments/commentSlice";
import CommentSkeleton from "components/skeleton/CommentSkeleton";
import LoadingType from "components/loading/LoadingType";
import { Link } from "react-router-dom";

const CommentFeature = ({ modalComment, handleHideModal, post }) => {
  const { _id, authorID } = post;
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentList(_id));
    socket.connect();
    socket.emit("join", { user: currentUser._id, post: _id });

    socket.on("comment", ({ user, comment, time }) => {
      const addedComment = { ...comment, userID: user };
      console.log(addedComment);
      dispatch(newComment(addedComment));
    });

    socket.on("deletedComment", (commentId) => {
      dispatch(deleteComment(commentId));
    });
    return () => {
      socket.disconnect();
      socket.removeAllListeners();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);
  const { listComment, loading } = useSelector(
    (state) => state.comments.getComment
  );

  return (
    <Overlay handleHideModal={handleHideModal}>
      <div className="w-[600px] mx-auto bg-white z-50 rounded-xl show-modal ">
        <ModalHeading handleHideModal={handleHideModal}>
          Post comments
        </ModalHeading>
        <ModalLine />
        <div className="flex flex-col px-5 py-4 max-h-[550px] overflow-auto">
          <PostMeta
            timer="22 minutes previous"
            sizeAvatar={52}
            author={authorID}
          ></PostMeta>
          <div className="px-[26px] my-2 flex items-center">
            <div className="h-[45px] w-[2px] bg-[#ddd]"></div>
            <p className="ml-5 text-sm text-text3">
              Replying to <b className="text-thirdColor">Hoan Do</b>
            </p>
          </div>
          <div className="flex items-start gap-x-3 ">
            <Link to={"/profile/" + currentUser._id}>
              <Avatar
                alt="Hoan"
                src={currentUser.avatar}
                sx={{ width: 52, height: 52 }}
              />
            </Link>
            <CommentForm></CommentForm>
          </div>
          <CommentList>
            {loading && (
              <>
                <CommentSkeleton></CommentSkeleton>
                <CommentSkeleton></CommentSkeleton>
              </>
            )}
            {!loading && listComment?.length > 0 ? (
              listComment.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))
            ) : (
              <div>No comment yet</div>
            )}
            <LoadingType message="Someone is typing a comment" />
          </CommentList>
        </div>
      </div>
    </Overlay>
  );
};

export default CommentFeature;
