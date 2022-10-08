import {
  AppBar,
  Box,
  Button,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import MonthLabelRow from "../components/MonthLabelRow";
import UserAvatar from "../components/UserAvatar";
import YearDataGrid from "../components/YearDataGrid";
import SignInModal from "../dialogs/LogInDialog";
import useDataKeyStore from "../stores/dataKeyStore";
import useUserStore from "../stores/userStore";
import useViewStore from "../stores/viewStore";
import theme, { colors } from "../theme";

const Home: NextPage = () => {
  const { year } = useViewStore();
  const { dataKeys } = useDataKeyStore();
  const { isAuthed } = useUserStore();
  const { openLoginDialog } = useViewStore();

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
          {isAuthed ? (
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
    const content = isAuthed ? (
      <>
        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
          <Typography variant="h1">{year}</Typography>
        </Box>
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
      </>
    ) : (
      <>
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
      </>
    );

    return (
      <Stack
        sx={{
          color: colors.TEXT,
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {content}
      </Stack>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      {renderBody()}
      <SignInModal />
    </ThemeProvider>
  );
};

export default Home;
