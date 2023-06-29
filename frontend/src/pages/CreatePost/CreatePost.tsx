import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import styles from "./CreatePost.module.scss";
import "easymde/dist/easymde.min.css";
import { useState, useRef, useEffect, RefObject } from "react";
import { ChangeEvent } from "react";
import axios from "../../axios";
import Alert from "@mui/material/Alert";
import { Grow } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<null | File>(null);
  const fileRef: RefObject<HTMLInputElement> = useRef(null);
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const textChangeHandler = (value: string) => {
    setText(value);
  };
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      formData.append("img", file || "");
      isEditing
        ? await axios.patch(`/post/${id}`, formData)
        : await axios.post("/post", formData);
      navigate(isEditing ? `/post/${id}` : "/");
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    const fetchEditPost = async () => {
      const { data } = await axios.get(`/post/${id}`);
      setTitle(data.title);
      setText(data.text);
    };
    if (id) {
      fetchEditPost();
    }
  }, [id]);
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "20px",
      }}
    >
      <h3>{isEditing ? "Редактирование" : "Новый пост"}</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Button
          variant="outlined"
          style={{ marginBottom: "10px" }}
          onClick={() => fileRef.current?.click()}
        >
          Загрузить изображение
        </Button>
        <Grow
          in={!!file}
          style={{ transformOrigin: "0 0 0" }}
          {...(file ? { timeout: 1000 } : {})}
        >
          <Alert severity="success">Изображение успешно загружено</Alert>
        </Grow>
        <input type="file" ref={fileRef} onChange={selectFile} hidden />
        <TextField
          id="standard-basic"
          label="Заголовок статьи..."
          variant="standard"
          value={title}
          onChange={titleChangeHandler}
        />
        <SimpleMDE
          className={styles.editor}
          onChange={textChangeHandler}
          value={text}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              background: "#c21717",
              color: "#fff",
              padding: "7px 30px",
            }}
            onClick={onSubmitHandler}
          >
            {isEditing ? "Редактировать" : "Сохранить"}
          </Button>
          <Button
            variant="outlined"
            style={{ padding: "7px 30px", marginLeft: "5px" }}
            onClick={() => navigate(id ? `/post/${id}` : "/")}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
