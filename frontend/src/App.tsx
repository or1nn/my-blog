import AppRouter from "./components/AppRouter";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { auth } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { postActions } from "./store/postSlice";
function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(auth());
    dispatch(postActions.setFavorites());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppRouter />
    </Container>
  );
}

export default App;
