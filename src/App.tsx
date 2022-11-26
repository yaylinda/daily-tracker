import { ThemeProvider } from "@emotion/react";
import FlakyIcon from "@mui/icons-material/Flaky";
import TodayIcon from "@mui/icons-material/Today";
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import LoggedOutView from "./components/LoggedOutView";
import UserAvatar from "./components/UserAvatar";
import AddDataKeyDialog from "./dialogs/AddDataKeyDialog";
import LogInDialog from "./dialogs/LogInDialog";
import useWindowDimensions from "./hooks/useWindowDimensions";
import StatsPage from "./pages/StatsPage";
import TodayPage from "./pages/TodayPage";
import VariablesPage from "./pages/VariablesPage";
import useStore from "./store";
import theme from "./theme";
import { NavigationTab } from "./types";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "./utils/constants";

function App() {
  const { isAuthed, loading, navigationTab, init, setNavigationTab } =
    useStore();
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    return (
      <Box sx={{ height: height - FOOTER_HEIGHT }}>
        <TodayPage />
        <VariablesPage />
        <StatsPage />
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <BottomNavigation
        showLabels
        value={navigationTab}
        onChange={(event, newValue) => {
          setNavigationTab(newValue);
        }}
      >
        <BottomNavigationAction
          label={NavigationTab.TODAY}
          icon={<TodayIcon />}
        />
        <BottomNavigationAction
          label={NavigationTab.VARIABLES}
          icon={<TodayIcon />}
        />
        <BottomNavigationAction
          label={NavigationTab.STATS}
          icon={<TodayIcon />}
        />
      </BottomNavigation>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {isAuthed ? (
        <>
          {renderContent()}
          {renderFooter()}
        </>
      ) : (
        <LoggedOutView />
      )}
      <LogInDialog />
      <AddDataKeyDialog />
    </ThemeProvider>
  );
}

export default App;
