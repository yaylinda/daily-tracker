import { ThemeProvider } from "@emotion/react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import React from "react";
import LoggedOutView from "./components/LoggedOutView";
import UserAvatar from "./components/UserAvatar";
import AddDataKeyDialog from "./dialogs/AddDataKeyDialog";
import LogInDialog from "./dialogs/LogInDialog";
import MainPanel from "./layout/MainPanel";
import Sidebar from "./layout/Sidebar";
import useStore from "./store";
import theme, { colors } from "./theme";

function App() {
  const { isAuthed, loading, init, openLoginDialog } = useStore();

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Typography
            variant="h4"
            noWrap
            sx={{ textAlign: "center", flexGrow: 1 }}
          >
            Life as Booleans
          </Typography>
          <Box>
            {loading ? null : isAuthed ? (
              <UserAvatar />
            ) : (
              <Button color="inherit" onClick={openLoginDialog}>
                Login
              </Button>
            )}
          </Box>
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
}

export default App;
