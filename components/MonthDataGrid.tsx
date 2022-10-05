import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { DAY_WIDTH } from "../utils/constants";
import { getDaysInMonth } from "../utils/monthGridUtil";

const DAYS_OF_WEEK_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export interface MonthDataGridProps {
  year: number;
  month: number;
}

const MonthDataGrid = ({ year, month }: MonthDataGridProps) => {
  const daysInMonth = React.useMemo(
    () => getDaysInMonth(year, month),
    [year, month]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {DAYS_OF_WEEK_LABELS.map((dow, i) => (
          <Box
            key={`${month}_dow_${i}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: DAY_WIDTH,
              height: DAY_WIDTH,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{dow}</Typography>
          </Box>
        ))}
      </Box>
      {daysInMonth.map((weekInMonth, weekNum) => (
        <Box
          key={`month_${month}_week_${weekNum}`}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {weekInMonth.map((dayInWeek, dayNum) => (
            <Box
              key={`month_${month}_week_${weekNum}_day_${dayNum}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: DAY_WIDTH,
                height: DAY_WIDTH,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                {dayInWeek.day > 0 ? dayInWeek.day : ""}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MonthDataGrid;
