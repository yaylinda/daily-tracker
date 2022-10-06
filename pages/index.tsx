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
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import MonthLabelRow from "../components/MonthLabelRow";

const Home: NextPage = () => {
  const { year } = useViewStore();
  const { dataKeys } = useDataKeyStore();

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
            Daily Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {renderHeader()}
      <Stack
        sx={{
          color: colors.TEXT,
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
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
      </Stack>
    </ThemeProvider>
  );
};

export default Home;
