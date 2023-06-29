import { Skeleton, Avatar, ListItemText, ListItem } from "@mui/material";

const CommentBlockSkeleton = () => {
  return (
    <ListItem
      alignItems="flex-start"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        margin: "10px 0",
        borderRadius: "2px",
        height: "112px",
      }}
    >
      <Skeleton
        variant="circular"
        style={{ marginRight: "10px", marginTop: "5px" }}
      >
        <Avatar alt="loading" src="" />
      </Skeleton>
      <ListItemText
        primary={<Skeleton width={170} />}
        secondary={
          <>
            <Skeleton />
            <Skeleton />
          </>
        }
      />
    </ListItem>
  );
};

export default CommentBlockSkeleton;
