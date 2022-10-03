import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { colors } from "../theme";
import { getMonthLabels } from "../utils/monthData";
import MonthDataGrid from "./MonthDataGrid";

export interface YearDataGridProps {
  year: number;
}

const YearDataGrid = ({ year }: YearDataGridProps) => {
  const monthLabels = React.useMemo(() => getMonthLabels(), []);

  return (
    <Box sx={{ color: colors.TEXT }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {monthLabels.map((monthLabel) => (
          <Box>
            <Typography>{monthLabel}</Typography>
          </Box>
        ))}
      </Box>
      <MonthDataGrid year={year} month={0} />
    </Box>
  );
};

export default YearDataGrid;
