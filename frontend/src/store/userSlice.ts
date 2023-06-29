import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const auth = createAsyncThunk("user/auth", async () => {
  if (localStorage.getItem("token")) {
    const res = await axios.get("/user/auth");
    return res.data;
  }
});

export const fetchNewAvatar = createAsyncThunk(
  "user/fetchNewAvatar",
  async (formdata: FormData) => {
    const { data } = await axios.post("/user/newAvatar", formdata);
    return data;
  }
);

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

interface UserSliceState {
  isAuth: boolean;
  user: null | User;
}

const initialState: UserSliceState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("favorites");
    },
    setAvatar(state, action) {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      auth.fulfilled,
      (state, action: PayloadAction<{ token: string; user: User } | null>) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.isAuth = true;
          localStorage.setItem("token", action.payload.token);
        }
      }
    );
    builder.addCase(auth.rejected, () => {
      localStorage.removeItem("token");
    });
    builder.addCase(
      fetchNewAvatar.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      }
    );
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
