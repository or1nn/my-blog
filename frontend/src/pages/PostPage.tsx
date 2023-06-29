import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "../store/commentSlice";
import { Post } from "../store/postSlice";
import { RootState } from "../store";
import axios from "../axios";
import {
  Button,
  FormControl,
  LinearProgress,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Avatar,
  Typography,
} from "@mui/material";
import PostComments from "../components/PostComments";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user, isAuth } = useSelector((state: RootState) => state.user);
  const addComment = async () => {
    const res = await axios.post(`/comment?postId=${id}`, {
      postId: id,
      content: comment,
    });
    dispatch(commentActions.setNewComment({ ...res.data, user: user }));
    setComment("");
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/post/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id]);
  return (
    <>
      {post ? (
        <>
          <Card
            sx={{
              maxWidth: 1045,
              margin: "20px auto",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2>{post.title}</h2>
            </div>
            <CardHeader
              avatar={
                <Avatar
                  aria-label={post.user.username}
                  src={`http://localhost:5000/avatars/${post.user.avatar}`}
                >
                  {post.user.username[0]}
                </Avatar>
              }
              title={post.user.username}
              subheader={new Date(post.createdAt).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:5000/img/${post.img}`}
              alt={post.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <ReactMarkdown children={post.text} />
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <VisibilityIcon
                  color="primary"
                  style={{ marginRight: "5px" }}
                />
                <span
                  style={{ color: "#c21717", fontSize: 23, fontWeight: 600 }}
                >
                  {post.views}
                </span>
              </div>
              {isAuth &&
                (user?.id === post.user.id || user?.role === "ADMIN") && (
                  <Button
                    onClick={() => navigate(`/edit/post/${id}`)}
                    startIcon={<EditIcon />}
                  >
                    Редактировать
                  </Button>
                )}
            </CardActions>
          </Card>
          <Card
            sx={{
              maxWidth: 1045,
              margin: "20px auto",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              padding: "20px",
            }}
          >
            <FormControl sx={{ display: "flex" }}>
              <textarea
                placeholder="Введите сообщение..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  fontSize: "14px",
                  padding: "10px",
                  height: "70px",
                  fontFamily: "Roboto",
                  borderRadius: "3px",
                  marginBottom: "10px",
                }}
              />
              <Button
                disabled={!comment || !isAuth}
                onClick={addComment}
                variant="contained"
                sx={{ maxWidth: "300px" }}
              >
                Оставить комментарий
              </Button>
            </FormControl>
          </Card>
          {id && <PostComments postId={id} />}
        </>
      ) : (
        <div style={{ margin: "20px" }}>
          <LinearProgress />
        </div>
      )}
    </>
  );
}
