import { FC } from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

interface CommentBlockItemProps {
  avatar: string;
  title: string;
  author: string;
  content: string;
  onClick: () => void;
}

const CommentBlockItem: FC<CommentBlockItemProps> = ({
  avatar,
  title,
  author,
  content,
  onClick,
}) => {
  return (
    <ListItem
      onClick={onClick}
      alignItems="flex-start"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        margin: "10px 0",
        borderRadius: "2px",
        cursor: "pointer",
      }}
    >
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={`http://localhost:5000/avatars/${avatar}`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {author}
            </Typography>
            {` — ${
              content.length > 47 ? content.slice(0, 48) + "..." : content
            }`}
          </>
        }
      />
    </ListItem>
  );
};

export default CommentBlockItem;
