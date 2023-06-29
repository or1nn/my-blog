import { Card, CardActions, CardHeader, Skeleton } from "@mui/material";

const PostSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: 800,
        height: "327px",
        marginTop: "20px",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
      <Skeleton
        sx={{
          borderRadius: "5px",
          height: 30,
          marginLeft: "15px",
          marginTop: "15px",
          width: 220,
        }}
        animation="wave"
        variant="rectangular"
      />
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={<Skeleton animation="wave" height={30} width={100} />}
        subheader={<Skeleton animation="wave" height={30} width={120} />}
      />

      <CardActions>
        <Skeleton
          animation="wave"
          style={{ marginLeft: "5px", borderRadius: "4px" }}
          height={36}
          width={120}
        />
      </CardActions>
    </Card>
  );
};

export default PostSkeleton;
