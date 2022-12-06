import { ThemeProvider } from "@emotion/react";
import TodayIcon from "@mui/icons-material/Today";
import CodeIcon from "@mui/icons-material/Code";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  LinearProgress,
} from "@mui/material";
import React from "react";
import LoggedOutView from "./components/LoggedOutView";
import AddVariableDialog from "./dialogs/AddVariableDialog";
import LogInDialog from "./dialogs/LogInDialog";
import useWindowDimensions from "./hooks/useWindowDimensions";
import TodayPage from "./pages/TodayPage";
import VariablesPage from "./pages/VariablesPage";
import useStore from "./store";
import theme from "./theme";
import { NavigationTab } from "./types";
import { FOOTER_HEIGHT } from "./utils/constants";

function App() {
  const { isAuthed, loading, navigationTab, init, setNavigationTab } =
    useStore();
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (navigationTab) {
      case NavigationTab.TODAY:
        return <TodayPage />;
      case NavigationTab.VARIABLES:
        return <VariablesPage />;
    }
  };

  const renderFooter = () => {
    return (
      <BottomNavigation
        showLabels
        value={navigationTab}
        onChange={(_, newValue) => {
          setNavigationTab(newValue);
        }}
      >
        <BottomNavigationAction
          value={NavigationTab.TODAY}
          label={NavigationTab.TODAY}
          icon={<TodayIcon />}
        />
        <BottomNavigationAction
          value={NavigationTab.VARIABLES}
          label={NavigationTab.VARIABLES}
          icon={<CodeIcon />}
        />
      </BottomNavigation>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LinearProgress />
      ) : isAuthed ? (
        <>
          <Box
            sx={{
              height: height - FOOTER_HEIGHT,
              overflow: "hidden",
            }}
          >
            {renderContent()}
            <AddVariableDialog />
          </Box>
          {renderFooter()}
        </>
      ) : (
        <>
          <LoggedOutView />
          <LogInDialog />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
