import { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Post, postActions } from "../store/postSlice";
import UserInfo from "./UserInfo";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface FavoritePostProps {
  post: Post;
  onClick: () => void;
}

const FavoritePost: FC<FavoritePostProps> = ({ post, onClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const deleteFavoriteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(postActions.toggleFavorite(post));
  };
  const {user, title, createdAt, img, views} = post
  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        cursor: "pointer",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={`http://localhost:5000/img/${img}`}
        title={title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ fontWeight: 600, fontSize: 30 }}
        >
          {post.title}
        </Typography>
        <UserInfo
          avatar={user.avatar}
          name={user.username}
          date={createdAt}
        />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <IconButton onClick={deleteFavoriteHandler}>
            <FavoriteIcon style={{ fill: "red" }} />
          </IconButton>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <VisibilityIcon style={{ fill: "#c21717" }} />
          <span
            style={{ color: "#c21717", marginLeft: "5px", fontWeight: 600 }}
          >
            {views}
          </span>
        </div>
      </CardActions>
    </Card>
  );
};

export default FavoritePost;
