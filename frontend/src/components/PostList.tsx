import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchPosts } from "../store/postSlice";
import Post from "./Post";
import PostSkeleton from "./PostsSkeleton";

const PostList = () => {
  const { sort, searchValue, loadingPosts, currentPage } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts({ sort, searchValue, currentPage }));
  }, [dispatch, sort, searchValue, currentPage]);
  const posts = useSelector((state: RootState) => state.post.posts);
  return (
    <div>
      {loadingPosts
        ? [...new Array(3)].map((_, i) => <PostSkeleton key={i} />)
        : posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              favpost={post}
              date={post.createdAt}
              author={post.user}
              img={post.img}
              views={post.views}
              title={post.title}
            />
          ))}
    </div>
  );
};

export default PostList;
