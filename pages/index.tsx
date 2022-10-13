import {
  AppBar,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import LoggedOutView from "../components/LoggedOutView";
import UserAvatar from "../components/UserAvatar";
import AddDataKeyDialog from "../dialogs/AddDataKeyDialog";
import DayDataDialog from "../dialogs/DayDataDialog";
import LogInDialog from "../dialogs/LogInDialog";
import MainPanel from "../layout/MainPanel";
import Sidebar from "../layout/Sidebar";
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
        position="fixed"
        sx={{
          backgroundColor: colors.SURFACE_BACKGROUND,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
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

  const renderContent = () => {
    if (!isAuthed && !loading) {
      return <LoggedOutView />;
    }
    return (
      <>
        <Sidebar />
        <MainPanel />
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      {renderContent()}
      <LogInDialog />
      <AddDataKeyDialog />
    </ThemeProvider>
  );
};

export default Home;
