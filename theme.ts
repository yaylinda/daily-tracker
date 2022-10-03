import { createTheme } from "@mui/material";

export const colors = Object.freeze({
  BACKGROUND: "#18191a",
  SURFACE_BACKGROUND: "#242526",
  TEXT: "#f5f6f7",
});

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Mono"].join(","),
  },
  palette: {
    background: {
      paper: colors.BACKGROUND,
    },
    text: {
      primary: colors.TEXT,
    },
  },
});

export default theme;
