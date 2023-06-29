import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deletePost } from "../../store/postSlice";
import { Typography, Modal, Box, Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

interface DeleteModalProps {
  onClose: () => void;
  open: boolean;
  postId: number;
}

const DeleteModal: FC<DeleteModalProps> = ({ onClose, open, postId }) => {
  const dispatch: AppDispatch = useDispatch();
  const sumbitHandler = () => {
    dispatch(deletePost(postId));
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "10px" }}
        >
          Вы действительно хотите удалить пост?
        </Typography>
        <div>
          <Button color="success" variant="outlined" onClick={sumbitHandler}>
            Подтвердить
          </Button>
          <Button
            sx={{ ml: "10px" }}
            color="error"
            variant="outlined"
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
