import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost/CreatePost";
import Favorite from "./pages/Favorite";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
  BLOG_ROUTE,
  POST_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  CREATE_POST_ROUTE,
  FAVORITE_ROUTE,
  EDIT_POST_ROUTE,
} from "./utils/consts";

type RouteType = {
  path: string;
  component: () => JSX.Element;
};

export const authRoutes: RouteType[] = [
  { path: PROFILE_ROUTE, component: Profile },
  { path: CREATE_POST_ROUTE, component: CreatePost },
  { path: EDIT_POST_ROUTE + "/:id", component: CreatePost },
  { path: FAVORITE_ROUTE, component: Favorite },
];

export const publicRoutes: RouteType[] = [
  {
    path: LOGIN_ROUTE,
    component: SignIn,
  },
  {
    path: REGISTRATION_ROUTE,
    component: SignUp,
  },
  {
    path: BLOG_ROUTE,
    component: Blog,
  },
  {
    path: POST_ROUTE + "/:id",
    component: PostPage,
  },
];
