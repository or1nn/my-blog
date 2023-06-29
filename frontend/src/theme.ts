import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none"] as any,
  palette: {
    primary: {
      main: '#c21717',
    },
    secondary: {
      main: '#fff7ed',
    },
   
  },
  typography: {
    button: {
      // textTransform: "none",
      // fontWeight: 400,
    },
  },
});

theme.shadows[1] = ''
theme.shadows[4] = ''
theme.shadows[8] = ''