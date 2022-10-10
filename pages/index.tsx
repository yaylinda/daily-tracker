import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  AppBar,
  Box,
  Button,
  LinearProgress,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import MonthLabelRow from "../components/MonthLabelRow";
import UserAvatar from "../components/UserAvatar";
import YearDataGrid from "../components/YearDataGrid";
import AddDataKeyDialog from "../dialogs/AddDataKeyDialog";
import LogInDialog from "../dialogs/LogInDialog";
import useStore from "../store";
import theme, { colors } from "../theme";

const Home: NextPage = () => {
  const {
    year,
    dataKeys,
    isAuthed,
    loading,
    init,
    openLoginDialog,
    openAddDataKeyDialog,
  } = useStore();

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

  /**
   * Body content
   */
  const renderBody = () => {
    if (!isAuthed) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            width: "50%",
          }}
        >
          <Typography variant="h2">
            Track and visualize your years in booleans
          </Typography>
          <Typography>Sign in to get started!</Typography>
        </Box>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Typography variant="h1">{year}</Typography>
        </Box>
        {renderData()}
      </>
    );
  };

  const renderData = () => {
    if (dataKeys.length) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            color: colors.TEXT,
            gap: 2,
          }}
        >
          <MonthLabelRow />
          <Stack>
            {dataKeys.map((dataKey) => (
              <YearDataGrid
                key={`${year}_${dataKey.id}`}
                year={year}
                dataKey={dataKey}
              />
            ))}
          </Stack>
        </Box>
      );
    }

    return (
      <Stack sx={{ width: 400, alignSelf: "center" }}>
        <Typography
          variant="caption"
          color={colors.LIGHTER_TEXT}
          sx={{ marginBottom: 1 }}
        >
          Add a new Life Attribute to track daily that can be expressed as a
          boolean (a "true" or "false" value).
        </Typography>
        <Typography variant="caption" color={colors.LIGHTER_TEXT}>
          This can be something like "Felt Happy", or "Exercised", or even "Got
          out of bed".
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{ marginTop: 5 }}
          onClick={openAddDataKeyDialog}
        >
          Add Life Attribute
        </Button>
      </Stack>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      {loading ? (
        <LinearProgress />
      ) : (
        <Stack
          sx={{
            color: colors.TEXT,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          {renderBody()}
        </Stack>
      )}
      <LogInDialog />
      <AddDataKeyDialog />
    </ThemeProvider>
  );
};

export default Home;
