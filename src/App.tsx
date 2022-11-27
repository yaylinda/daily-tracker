import { ThemeProvider } from "@emotion/react";
import TodayIcon from "@mui/icons-material/Today";
import CodeIcon from '@mui/icons-material/Code';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  LinearProgress
} from "@mui/material";
import React from "react";
import LoggedOutView from "./components/LoggedOutView";
import AddDataKeyDialog from "./dialogs/AddDataKeyDialog";
import LogInDialog from "./dialogs/LogInDialog";
import StarRatingDialog from "./dialogs/StarRatingDialog";
import useWindowDimensions from "./hooks/useWindowDimensions";
import StatsPage from "./pages/StatsPage";
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
      case NavigationTab.STATS:
        return <StatsPage />;
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
        <BottomNavigationAction
          value={NavigationTab.STATS}
          label={NavigationTab.STATS}
          icon={<QueryStatsIcon />}
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
              overflow: 'hidden'
            }}
          >
            {renderContent()}
            <StarRatingDialog />
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
