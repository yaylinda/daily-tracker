import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import DayDataDialog from "../dialogs/DayDataDialog";
import useStore from "../store";
import { colors } from "../theme";
import { DataKey, DayDate } from "../types";
import { DAY_WIDTH } from "../utils/constants";
import { getDaysInMonth } from "../utils/dateUtil";
import { getDayData } from "../utils/yearDataUtils";

export interface MonthDataGridProps {
  dataKey: DataKey;
  year: number;
  month: number;
}

const MonthDataGrid = ({ dataKey, year, month }: MonthDataGridProps) => {
  const daysInMonth = React.useMemo(
    () => getDaysInMonth(year, month),
    [year, month]
  );

  const yearData = useStore((state) => state.yearDataMap[year]);

  const [dayDataDialogProps, setDayDataDialogProps] = React.useState<{
    open: boolean;
    dayDate: DayDate;
    dataKeys: DataKey[];
  }>({ open: false, dayDate: {} as DayDate, dataKeys: [] });

  const openDayDataDialog = (dataKey: DataKey, day: number) => {
    setDayDataDialogProps({
      open: true,
      dayDate: { year, month, day },
      dataKeys: [dataKey],
    });
  };

  const closeDayDataDialog = () => {
    setDayDataDialogProps((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const renderDay = (weekNum: number, dayInWeekNum: number, day: number) => {
    const dayDate = { year, month, day };
    const { isTrue, isFalse } = getDayData(yearData, dataKey.id, dayDate);
    const dayMoment = moment(new Date(year, month, day));
    const isToday = dayMoment.isSame(moment(), "day");
    const isFuture = dayMoment.isAfter(moment(), "day");
    const hasData = isTrue || isFalse;

    const textColor =
      !hasData && isToday
        ? "black"
        : isFuture
        ? colors.LIGHTER_TEXT
        : colors.TEXT;

    const backgroundColor = isTrue
      ? "green"
      : isFalse
      ? "red"
      : isToday
      ? "yellow"
      : undefined;

    const dayContent =
      day < 0 ? (
        <Typography>{""}</Typography>
      ) : (
        <Typography color={textColor} sx={{ fontSize: 10 }}>
          {day}
        </Typography>
      );

    return (
      <Button
        key={`month_${month}_week_${weekNum}_day_${dayInWeekNum}`}
        size="small"
        disabled={day < 0 || isFuture}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: DAY_WIDTH,
          width: DAY_WIDTH,
          maxWidth: DAY_WIDTH,
          minWidth: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          backgroundColor: backgroundColor,
        }}
        onClick={() => openDayDataDialog(dataKey, day)}
      >
        {dayContent}
      </Button>
    );
  };

  return (
    <>
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
      <DayDataDialog onClose={closeDayDataDialog} {...dayDataDialogProps} />
    </>
  );
};

export default MonthDataGrid;
