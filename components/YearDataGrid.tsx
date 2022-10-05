import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { colors } from "../theme";
import { DataKey } from "../types";
import { DAY_WIDTH, MONTH_WIDTH, NUM_MONTHS } from "../utils/constants";
import { getMonthLabels } from "../utils/monthGridUtil";
import MonthDataGrid from "./MonthDataGrid";

export interface YearDataGridProps {
  dataKey: DataKey;
  year: number;
}

const YearDataGrid = ({ dataKey, year }: YearDataGridProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box>
        <Typography>{dataKey.displayName}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {Array.from(Array(NUM_MONTHS)).map((_, i) => (
          <MonthDataGrid
            key={`${dataKey.id}_${year}_${i}`}
            year={year}
            month={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export default YearDataGrid;
