import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { User } from "./userSlice";

export interface Post {
  id: number;
  title: string;
  text: string;
  img: string;
  views: number;
  createdAt: string;
  user: User;
}

interface postSliceState {
  posts: Post[] | null;
  favorites: Post[];
  errorPosts: boolean;
  sort: string;
  loadingPosts: boolean;
  searchValue: string;
  currentPage: number;
  postsCount: number;
}

const initialState: postSliceState = {
  posts: null,
  favorites: [],
  sort: "createdAt",
  errorPosts: false,
  loadingPosts: true,
  searchValue: "",
  currentPage: 1,
  postsCount: 0,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async ({
    sort,
    searchValue,
    currentPage,
  }: {
    sort: string;
    searchValue: string;
    currentPage: number;
  }) => {
    const res = await axios.get(
      `/post?sort=${sort}&search=${searchValue}&page=${currentPage}&limit=3`
    );
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: number) => {
    await axios.delete(`/post/${id}`);
    return id;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Post>) {
      const ids = state.favorites.map((post) => post.id);
      if (!ids.includes(action.payload.id)) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        );
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setFavorites(state) {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        state.favorites = JSON.parse(favorites);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<{ count: number; rows: Post[] }>) => {
        state.posts = action.payload.rows;
        state.postsCount = action.payload.count;
        state.errorPosts = false;
        state.loadingPosts = false;
      }
    );
    builder.addCase(fetchPosts.pending, (state) => {
      state.errorPosts = false;
      state.loadingPosts = true;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.errorPosts = true;
      state.loadingPosts = false;
    });
    builder.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (state.posts) {
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload
          );
        }
      }
    );
  },
});

export default postSlice.reducer;

export const postActions = postSlice.actions;
