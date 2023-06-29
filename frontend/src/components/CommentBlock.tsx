import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { fetchLastComments } from "../store/commentSlice";
import CommentBlockItem from "./CommentBlockItem";
import CommentBlockSkeleton from "./CommentsBlockSkeleton";
import List from "@mui/material/List";

const CommentBlock = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loadingComments, comments } = useSelector(
    (state: RootState) => state.comment
  );
  const skeleton = [...new Array(6)].map((_, i) => (
    <CommentBlockSkeleton key={i} />
  ));
  useEffect(() => {
    dispatch(fetchLastComments());
  }, [dispatch]);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h3 style={{ margin: 0 }}>Комментарии</h3>
      {loadingComments
        ? skeleton
        : comments?.map((comment) => (
            <CommentBlockItem
              onClick={() => navigate(`/post/${comment.post.id}`)}
              key={comment.id}
              avatar={comment.user.avatar}
              title={comment.post.title}
              author={comment.user.username}
              content={comment.content}
            />
          ))}
    </List>
  );
};

export default CommentBlock;
