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
import { socket } from "../../api/axios";
import { getCommentList } from "redux/comments/commentRequest";
import { deleteComment, newComment } from "redux/comments/commentSlice";

const CommentFeature = ({ modalStatus, handleHideModal, post }) => {
  const { _id } = post;
  const { currentUser } = useSelector((state) => state.auth.login);
  const { listComment, loading } = useSelector(
    (state) => state.comments.getComment
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentList(_id));
    socket.emit("join", { user: currentUser._id, post: _id });
    socket.on("comment", ({ user, comment, time }) => {
      console.log(comment);
      const addedComment = { ...comment, userID: user };
      dispatch(newComment(addedComment));
    });
    socket.on("deletedComment", (commentId) => {
      dispatch(deleteComment(commentId));
    });
  }, [_id]);

  useEffect(() => {
    if (modalStatus === false) {
      socket.emit("disconnect");
    }
    console.log("MODAL STATUS: ", modalStatus);
  }, [modalStatus]);
  return (
    <Overlay handleHideModal={handleHideModal}>
      <div className="w-[600px] mx-auto bg-white z-50 rounded-xl show-modal ">
        <ModalHeading handleHideModal={handleHideModal}>
          Post comments
        </ModalHeading>
        <ModalLine />
        <div className="flex flex-col px-5 py-4 max-h-[550px] overflow-auto">
          <PostMeta
            // avatar="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            // fullName="Hoan Do"
            timer="22 minutes previous"
            sizeAvatar={52}
            author={currentUser}
          ></PostMeta>
          <div className="px-[26px] my-2 flex items-center">
            <div className="h-[45px] w-[2px] bg-[#ddd]"></div>
            <p className="ml-5 text-sm text-text3">
              Replying to <b className="text-thirdColor">Hoan Do</b>
            </p>
          </div>
          <div className="flex items-start gap-x-3 ">
            <Avatar
              alt="Hoan"
              src="https://images.unsplash.com/photo-1668090956076-b2c9d6193e6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
              sx={{ width: 52, height: 52 }}
            />
            <CommentForm></CommentForm>
          </div>
          <CommentList>
            {listComment?.length > 0 ? (
              listComment?.map((comment) => (
                <CommentItem key={comment} comment={comment} />
              ))
            ) : (
              <div>No comment yet</div>
            )}
          </CommentList>
        </div>
      </div>
    </Overlay>
  );
};

export default CommentFeature;
