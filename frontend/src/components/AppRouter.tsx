import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return (
    <Routes>
      {isAuth &&
        authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
