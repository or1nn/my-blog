import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteComment } from "../store/commentSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Card,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@mui/material";

interface PostCommentsItemsProps {
  avatar: string;
  content: string;
  author: string;
  id: number;
  userId: number;
  role: string;
}

const PostCommentsItem: FC<PostCommentsItemsProps> = ({
  avatar,
  author,
  content,
  id,
  userId,
  role,
}) => {
  const [isLike, setIsLike] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const currentUserId = useSelector((state: RootState) => state.user.user?.id);

  const onDeleteHandler = () => {
    dispatch(deleteComment(id));
  };
  let roleStyle;
  switch (role) {
    case "ADMIN":
      roleStyle = {
        color: "#c21717",
        fontWeight: 600,
      };
      break;
    case "USER":
      roleStyle = {
        color: "rgba(0, 0, 0, 0.6)",
        fontWeight: 500,
      };
      break;
  }
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        maxWidth: "1045px",
        margin: "15px auto",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        padding: "20px",
      }}
    >
      <Card>
        <div>
          <div>
            <ListItemAvatar>
              <Avatar
                alt={author}
                src={`http://localhost:5000/avatars/${avatar}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <div style={{ fontWeight: 500 }}>
                  {author} <span style={roleStyle}>[{role}]</span>
                </div>
              }
              secondary={<>{content}</>}
            />
          </div>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => setIsLike((state) => !state)}
          >
            <FavoriteIcon
              fontSize="inherit"
              style={{ fill: isLike ? "#c21717" : "" }}
            />
          </IconButton>
          {currentUserId === userId && (
            <IconButton
              aria-label="delete"
              size="large"
              onClick={onDeleteHandler}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </div>
      </Card>
    </ListItem>
  );
};

export default PostCommentsItem;
