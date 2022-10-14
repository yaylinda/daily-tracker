import { Typography, Button } from "@mui/material";
import moment from "moment";
import useStore from "../store";
import { colors } from "../theme";
import { DataKey, DayDate } from "../types";
import { DAY_WIDTH } from "../utils/constants";
import { getMomentFromDayDate } from "../utils/dateUtil";
import { getDayData } from "../utils/yearDataUtils";

interface CalendarDayProps {
  dayDate: DayDate;
  dataKey: DataKey;
}

const CalendarDay = ({ dayDate, dataKey }: CalendarDayProps) => {
  const [dataBooleans, openDayDataDialog] = useStore((state) => [
    getDayData(state.yearDataMap[dayDate.year], dataKey.id, dayDate),
    state.openDayDataDialog,
  ]);
  const { isTrue, isFalse } = dataBooleans;
  const dayMoment = getMomentFromDayDate(dayDate);
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
    dayDate.day < 0 ? (
      <Typography>{""}</Typography>
    ) : (
      <Typography color={textColor} sx={{ fontSize: 10 }}>
        {dayDate.day}
      </Typography>
    );

  return (
    <Button
      size="small"
      disabled={dayDate.day < 0 || isFuture}
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
      onClick={() => openDayDataDialog(dataKey, dayDate)}
    >
      {dayContent}
    </Button>
  );
};

export default CalendarDay;
