import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { getMonthData } from "../utils/monthData";

const DAYS_OF_WEEK_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export interface MonthDataGridProps {
  year: number;
  month: number;
}

const MonthDataGrid = ({ year, month }: MonthDataGridProps) => {
  const data = React.useMemo(() => getMonthData(year, month), [year, month]);

  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {DAYS_OF_WEEK_LABELS.map((dow) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{dow}</Typography>
          </Box>
        ))}
      </Box>
      {data.map((weekData) => (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {weekData.map((dayData) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">{dayData.day}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Paper>
  );
};

export default MonthDataGrid;
