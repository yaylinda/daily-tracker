import {
  AppBar,
  Button,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import UserAvatar from "../components/UserAvatar";
import AddDataKeyDialog from "../dialogs/AddDataKeyDialog";
import DayDataDialog from "../dialogs/DayDataDialog";
import LogInDialog from "../dialogs/LogInDialog";
import YearGridLayout from "../layouts/YearGridLayout";
import useStore from "../store";
import theme, { colors } from "../theme";

const Home: NextPage = () => {
  const { isAuthed, loading, init, openLoginDialog } = useStore();

  React.useEffect(() => {
    init();
  }, []);

  /**
   * Header Component
   */
  const renderHeader = () => {
    return (
      <AppBar
        position="static"
        sx={{ backgroundColor: colors.SURFACE_BACKGROUND }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ textAlign: "center", flexGrow: 1 }}>
            Life as Booleans
          </Typography>
          {loading ? null : isAuthed ? (
            <UserAvatar />
          ) : (
            <Button color="inherit" onClick={openLoginDialog}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      {loading ? <LinearProgress /> : <YearGridLayout />}
      <LogInDialog />
      <AddDataKeyDialog />
      <DayDataDialog />
    </ThemeProvider>
  );
};

export default Home;
