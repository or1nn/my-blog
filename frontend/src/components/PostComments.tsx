import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import PostCommentsItem from "./PostCommentsItem";
import { fetchCommmentsOnPage } from "../store/commentSlice";
import List from "@mui/material/List";

interface PostCommentsProps {
  postId: string;
}

const PostComments: FC<PostCommentsProps> = ({ postId }) => {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(
    (state: RootState) => state.comment.commentsOnPage
  );
  useEffect(() => {
    dispatch(fetchCommmentsOnPage(postId));
  }, [dispatch, postId]);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {comments &&
        comments.map((comment) => (
          <PostCommentsItem
            key={comment.id}
            id={comment.id}
            avatar={comment.user.avatar}
            author={comment.user.username}
            content={comment.content}
            userId={comment.user.id}
            role={comment.user.role}
          />
        ))}
    </List>
  );
};

export default PostComments;
