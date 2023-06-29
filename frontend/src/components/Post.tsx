import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { postActions, Post as PostType } from "../store/postSlice";
import { User } from "../store/userSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserInfo from "./UserInfo";
import DeleteModal from "./Modals/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DoneIcon from "@mui/icons-material/Done";

interface PostProps {
  title: string;
  author: User;
  views: number;
  img: string;
  date: string;
  id: number;
  favpost: PostType;
}

const Post: FC<PostProps> = ({
  title,
  views,
  author,
  img,
  date,
  id,
  favpost,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.post.favorites);
  const favoritesId = favorites.map((el) => el.id);
  const isFav = favoritesId.includes(id);
  const {user, isAuth} = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "20px 0",
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
          {title}
        </Typography>
        <UserInfo avatar={author.avatar} name={author.username} date={date} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            variant="contained"
            style={{ marginRight: "5px" }}
            sx={{ fontWeight: 600 }}
            onClick={() => navigate(`/post/${id}`)}
          >
            Подробнее
          </Button>
          {isAuth && <Button
            style={{ marginRight: "5px" }}
            variant={isFav ? "contained" : "outlined"}
            color="info"
            startIcon={isFav ? <DoneIcon /> : <BookmarkAddIcon />}
            onClick={() => dispatch(postActions.toggleFavorite(favpost))}
          >
            Избранное
          </Button>}
          {(author.id === user?.id || user?.role === "ADMIN") && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => setOpen(true)}
            >
              Удалить
            </Button>
          )}
          <DeleteModal postId={id} open={open} onClose={() => setOpen(false)} />
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

export default Post;
