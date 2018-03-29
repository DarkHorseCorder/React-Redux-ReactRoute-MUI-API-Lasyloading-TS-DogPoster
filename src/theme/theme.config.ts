import { createTheme } from "@mui/material";

export const theme = createTheme({
  // palette: {
  //   text:{
  //     primary: "#000000",
  //     secondary: '#222222'
  //   }
  // },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  },
  typography: {
    fontSize: 16
  }
})