import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../store/postSlice";
import { RootState } from "../store";
import PostList from "../components/PostList";
import CommentBlock from "../components/CommentBlock";
import { Button, ButtonGroup, Pagination, Grid } from "@mui/material";

const Blog = () => {
  const dispatch = useDispatch();
  const { sort: sortType, currentPage } = useSelector(
    (state: RootState) => state.post
  );
  const onChangePagination = (_: ChangeEvent<unknown>, page: number) => {
    dispatch(postActions.setCurrentPage(page));
  };
  return (
    <>
      <ButtonGroup
        sx={{ marginTop: "10px" }}
        variant="outlined"
        aria-label="outlined button group"
      >
        <Button
          variant={sortType === "createdAt" ? "contained" : "outlined"}
          onClick={() => dispatch(postActions.setSort("createdAt"))}
        >
          Новые
        </Button>
        <Button
          variant={sortType === "views" ? "contained" : "outlined"}
          onClick={() => dispatch(postActions.setSort("views"))}
        >
          Популярные
        </Button>
      </ButtonGroup>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <PostList />
          <Pagination
            onChange={onChangePagination}
            page={currentPage}
            count={3}
            color="primary"
            style={{ margin: "20px 0" }}
          />
        </Grid>
        <Grid item xs={3}>
          <CommentBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;
