import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import useDayDataStore from "../stores/dayDataStore";
import { colors } from "../theme";
import { DAY_WIDTH } from "../utils/constants";
import {
  getDateKey,
  getDayOfWeekLabels,
  getDaysInMonth,
} from "../utils/monthGridUtil";

export interface MonthDataGridProps {
  dataKeyId: string;
  year: number;
  month: number;
}

const MonthDataGrid = ({ dataKeyId, year, month }: MonthDataGridProps) => {
  const daysInMonth = React.useMemo(
    () => getDaysInMonth(year, month),
    [year, month]
  );

  const data = useDayDataStore(
    (state) => state.dayDataMap[year]?.[dataKeyId] || new Set([])
  );

  const renderDayContent = (day: number) => {
    if (day < 0) {
      return <Typography variant="body1">{""}</Typography>;
    }
    const dateKey = getDateKey({ year, month, day });
    const hasData = data.has(dateKey);
    return (
      <Typography variant="body1" color={hasData ? "green" : colors.TEXT}>
        {day}
      </Typography>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              {renderDayContent(dayInWeek.day)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MonthDataGrid;
