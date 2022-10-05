import {
  AppBar,
  Box,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import YearDataGrid from "../components/YearDataGrid";
import useDataKeyStore from "../stores/dataKeyStore";
import useViewStore from "../stores/viewStore";
import theme, { colors } from "../theme";
import { MONTH_WIDTH } from "../utils/constants";
import { getMonthLabels } from "../utils/monthGridUtil";

const Home: NextPage = () => {
  const { year } = useViewStore();
  const { dataKeys } = useDataKeyStore();
  const monthLabels = React.useMemo(() => getMonthLabels(), []);

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
      <Stack sx={{ color: colors.TEXT, margin: 10 }}>
        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
          <Typography variant="h1">{year}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            overflowX: "scroll",
            flexDirection: "column",
            color: colors.TEXT,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {monthLabels.map((monthLabel) => (
              <Box
                key={`${monthLabel}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: MONTH_WIDTH,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>{monthLabel}</Typography>
              </Box>
            ))}
          </Box>
          <YearDataGrid
            year={2022}
            dataKey={{ id: "abc", displayName: "Pooped" }}
          />
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default Home;
