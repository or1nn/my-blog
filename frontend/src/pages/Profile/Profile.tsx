import { useState, useEffect, useRef, RefObject, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Post } from "../../store/postSlice";
import { Comment } from "../../store/commentSlice";
import { useNavigate } from "react-router-dom";
import { fetchNewAvatar } from "../../store/userSlice";
import CommentBlockItem from "../../components/CommentBlockItem";
import { Button, Avatar } from "@mui/material/";
import styles from "./Profile.module.scss";
import axios from "../../axios";

interface commentByMe extends Comment {
  post: Post;
}
const Profile = () => {
  const inputFileRef: RefObject<HTMLInputElement> = useRef(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [lastComments, setLastComments] = useState<commentByMe[] | null>(null);
  const [newAvatar, setNewAvatar] = useState<null | File>(null);
  const { user } = useSelector((state: RootState) => state.user);

  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newAvatar = e.target.files?.[0];
    console.log(newAvatar);
    if (newAvatar) {
      setNewAvatar(newAvatar);
    }
  };

  const submitAvatarHandler = async () => {
    const formdata = new FormData();
    if (newAvatar) {
      formdata.append("avatar", newAvatar);
    }
    dispatch(fetchNewAvatar(formdata));
    setNewAvatar(null);
  };

  useEffect(() => {
    const fetchLastComments = async () => {
      const res = await axios.get(`/comment?userId=${user?.id}`);
      setLastComments(res.data);
    };
    fetchLastComments();
  }, [user?.id]);
  return (
    <div className={styles.root}>
      <h2>Профиль</h2>
      <div className={styles.box}>
        <Avatar
          sx={{ width: 150, height: 150 }}
          alt={user?.username}
          src={`http://localhost:5000/avatars/${user?.avatar.replace(
            "new",
            ""
          )}`}
        />
        <p className={styles.name}>
          {user?.username} <span>[{user?.role}]</span>
        </p>
      </div>
      <Button variant="contained" onClick={() => inputFileRef.current?.click()}>
        Изменить фото
      </Button>
      <Button
        sx={{ marginLeft: "10px" }}
        variant="contained"
        disabled={!newAvatar}
        onClick={submitAvatarHandler}
      >
        Подтвердить
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={changeAvatarHandler}
        hidden
      />
      <p className={styles.active}>Последняя активность:</p>
      {lastComments?.map((comment) => (
        <CommentBlockItem
          key={comment.id}
          avatar={user?.avatar || ""}
          title={comment.post.title}
          author={comment.user.username}
          content={comment.content}
          onClick={() => navigate(`/post/${comment.post.id}`)}
        />
      ))}
    </div>
  );
};

export default Profile;
