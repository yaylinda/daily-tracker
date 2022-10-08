import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import useStore from "../store";
import { colors } from "../theme";
import { DAY_WIDTH } from "../utils/constants";
import { getDateKey, getDaysInMonth } from "../utils/monthGridUtil";

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

  const data = useStore(
    (state) => state.dayDataMap[year]?.[dataKeyId] || new Set([])
  );

  const renderDayContent = (day: number) => {
    if (day < 0) {
      return <Typography variant="body2">{""}</Typography>;
    }
    const dateKey = getDateKey({ year, month, day });
    const hasData = data.has(dateKey);
    const dayMoment = moment(new Date(year, month, day));
    const isBefore = dayMoment.isBefore(moment(), "day");
    return (
      <Typography
        variant="body2"
        color={hasData ? "green" : isBefore ? colors.LIGHTER_TEXT : colors.TEXT}
      >
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
