import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import useStore from "../store";
import { colors } from "../theme";
import { DAY_WIDTH } from "../utils/constants";
import { getDateKey, getDaysInMonth } from "../utils/dateUtil";

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

  const { trueDates, falseDates, openDayDataDialog } = useStore((state) => ({
    trueDates: state.yearDataMap[year][`${true}`][dataKeyId] || new Set([]),
    falseDates: state.yearDataMap[year][`${false}`][dataKeyId] || new Set([]),
    openDayDataDialog: state.openDayDataDialog,
  }));

  const renderDay = (weekNum: number, dayInWeekNum: number, day: number) => {
    const dateKey = getDateKey({ year, month, day });
    const isTrue = trueDates.has(dateKey);
    const isFalse = falseDates.has(dateKey);
    const dayMoment = moment(new Date(year, month, day));
    const isToday = dayMoment.isSame(moment(), "day");

    const dayContent =
      day < 0 ? (
        <Typography variant="body2">{""}</Typography>
      ) : (
        <Typography
          variant="body2"
          color={isToday ? colors.TEXT : colors.LIGHTER_TEXT}
        >
          {day}
        </Typography>
      );

    const color = isTrue ? "green" : isFalse ? "red" : undefined;

    return (
      <Button
        key={`month_${month}_week_${weekNum}_day_${dayInWeekNum}`}
        size="small"
        disabled={day < 0}
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
          backgroundColor: color,
        }}
        onClick={() =>
          openDayDataDialog(dataKeyId, { year, month, day }, isTrue)
        }
      >
        {dayContent}
      </Button>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {daysInMonth.map((weekInMonth, weekNum) => (
        <Box
          key={`month_${month}_week_${weekNum}`}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {weekInMonth.map((dayInWeek, dayNum) =>
            renderDay(weekNum, dayNum, dayInWeek.day)
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MonthDataGrid;
