import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { RootState } from "../store";
import axios from "../axios";
import {
  Alert,
  Stack,
  Grow,
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";

export interface CopyrightProps {
  sx: {
    mt?: number;
    mb?: number;
  };
}

function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link style={{ color: "rgba(0, 0, 0, 0.6)" }} to="/">
        Or1nn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const navigate = useNavigate();
  if (isAuth) {
    navigate("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      dispatch(userActions.setUser(data.user));
    } catch (e) {
      setErrorMessage(true);
    }
  };
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grow
          in={successMessage}
          style={{ transformOrigin: "0 0 0" }}
          {...(successMessage ? { timeout: 1000 } : {})}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert onClose={() => setSuccessMessage(false)}>
              Успешный вход!
            </Alert>
          </Stack>
        </Grow>
        <Grow
          in={errorMessage}
          style={{ transformOrigin: "0 0 0" }}
          {...(errorMessage ? { timeout: 1000 } : {})}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error" onClose={() => setErrorMessage(false)}>
              Неверный E-mail или пароль
            </Alert>
          </Stack>
        </Grow>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeEmailHandler}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changePasswordHandler}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Сохранить пароль"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link style={{ color: "rgba(0, 0, 0, 0.6)" }} to="/">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link style={{ color: "rgba(0, 0, 0, 0.6)" }} to="/registration">
                {"Нет аккаунта? Регистрация"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
