import { AppBar, Box, ThemeProvider, Toolbar, Typography } from "@mui/material";
import type { NextPage } from "next";
import YearDataGrid from "../components/YearDataGrid";
import theme, { colors } from "../theme";

const Home: NextPage = () => {
  /**
   * Header Component
   */
  const renderHeader = () => {
    return (
      <AppBar
        position="static"
        sx={{ backgroundColor: colors.SURFACE_BACKGROUND }}
      >
        <Toolbar variant="dense">
          <Typography variant="h4" sx={{ textAlign: "center", flexGrow: 1 }}>
            Daily Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      <Box>
        <YearDataGrid year={2022} />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
