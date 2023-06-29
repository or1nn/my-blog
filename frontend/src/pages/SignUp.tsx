import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import useInput from "../hooks/useInput";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Grow,
  Stack,
  Alert,
  Container,
  Typography,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";
import { CopyrightProps } from "./SignIn";

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

export default function SignUp() {
  const navigate = useNavigate();
  const username = useInput("", { isEmpty: true, minLength: 4 });
  const email = useInput("", { isEmpty: true, minLength: 4, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 6 });
  const [checkbox, setCheckbox] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const newUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      };
      await axios.post("/user/registration", newUser);
      username.value = "";
      email.value = "";
      password.value = "";
      setCheckbox(false);
      setSuccessMessage(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (e) {
      setErrorMessage(true);
      console.log(e);
    }
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
              Вы успешно зарегистрировались!
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
              Произошла ошибка при регистрации
            </Alert>
          </Stack>
        </Grow>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                value={username.value}
                onChange={username.onChange}
                onBlur={username.onBlur}
                required
                fullWidth
                error={username.isDirty && username.minLengthError}
                id="username"
                label="Логин"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                error={email.isDirty && email.emailError}
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
                error={email.isDirty && password.minLengthError}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checkbox}
                    onClick={() => setCheckbox((state) => !state)}
                    color="primary"
                  />
                }
                label="Я принимаю условия пользовательского соглашения"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={
              !password.inputValid ||
              !username.inputValid ||
              !email.inputValid ||
              !checkbox
            }
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
