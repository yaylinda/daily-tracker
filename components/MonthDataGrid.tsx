import { Box, Button, Typography } from "@mui/material";
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
    (state) => new Set([...(state.yearDataMap[year]?.[dataKeyId] || [])])
  );

  const renderDayContent = (day: number) => {
    if (day < 0) {
      return <Typography variant="body2">{""}</Typography>;
    }
    const dateKey = getDateKey({ year, month, day });
    const hasData = data.has(dateKey);
    const dayMoment = moment(new Date(year, month, day));
    const isToday = dayMoment.isSame(moment(), "day");
    return (
      <Typography
        variant="body2"
        color={hasData ? "green" : isToday ? colors.TEXT : colors.LIGHTER_TEXT}
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
            <Button
              key={`month_${month}_week_${weekNum}_day_${dayNum}`}
              size="small"
              sx={{
                display: "flex",
                flexDirection: "column",
                height: DAY_WIDTH,
                width: DAY_WIDTH,
                maxWidth: DAY_WIDTH,
                minWidth: 0,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              {renderDayContent(dayInWeek.day)}
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MonthDataGrid;
