import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { User } from "./userSlice";
import { Post } from "./postSlice";

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  post: Post;
}

interface commentSliceState {
  comments: Comment[] | null;
  commentsOnPage: Comment[];
  errorComments: boolean;
  loadingComments: boolean;
}

const initialState: commentSliceState = {
  comments: null,
  commentsOnPage: [],
  errorComments: false,
  loadingComments: true,
};

export const fetchLastComments = createAsyncThunk(
  "comment/fetchLastComments",
  async () => {
    const { data } = await axios.get("/comment/last");
    return data;
  }
);

export const fetchCommmentsOnPage = createAsyncThunk(
  "comment/fetchCommentsOnPage",
  async (id: string) => {
    const { data } = await axios.get(`/comment?postId=${id}`);
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id: number) => {
    await axios.delete(`/comment/${id}`);
    return id;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setNewComment(state, action: PayloadAction<Comment>) {
      state.commentsOnPage.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLastComments.pending, (state) => {
      state.errorComments = false;
      state.loadingComments = true;
    });
    builder.addCase(
      fetchLastComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.errorComments = false;
        state.loadingComments = false;
      }
    );
    builder.addCase(fetchLastComments.rejected, (state) => {
      state.errorComments = true;
      state.loadingComments = false;
    });
    builder.addCase(
      fetchCommmentsOnPage.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.commentsOnPage = action.payload;
      }
    );
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (state.commentsOnPage) {
          state.commentsOnPage = state.commentsOnPage.filter(
            (comment) => comment.id !== action.payload
          );
        }
      }
    );
  },
});

export default commentSlice.reducer;

export const commentActions = commentSlice.actions;
