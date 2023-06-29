import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index.ts";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import { theme } from "./theme.ts";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
