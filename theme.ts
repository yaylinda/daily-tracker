import { createTheme } from "@mui/material";

export const colors = Object.freeze({
  BACKGROUND: "#18191a",
  SURFACE_BACKGROUND: "#242526",
  TEXT: "#f5f6f7",
  LIGHTER_TEXT: "gray",
});

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Mono"].join(","),
  },
  palette: {
    mode: "dark",
  },
});

export default theme;
