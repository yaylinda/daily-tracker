import { Box, Stack, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { DataKey, DayDate } from "../types";
import {
  getDateKey,
  getMomentFromDayDate,
  getWeekChunksForYearGrid,
} from "../utils/dateUtil";
import theme from "../theme";
import useStore from "../store";
import moment from "moment";

const CELL_SIZE = 10;
const CELL_BORDER = 0.5;

interface YearGridDayCellProps {
  dayDate: DayDate;
  dataKey: DataKey;
}

const YearGridDayCell = ({ dayDate, dataKey }: YearGridDayCellProps) => {
  const { yearDataMap } = useStore();

  const cellSize =
    dayDate.year === -1 ? CELL_SIZE + 2 * CELL_BORDER : CELL_SIZE;

  const created = moment(dataKey.createdAt, "X").isSameOrBefore(
    getMomentFromDayDate({ ...dayDate }),
    "day"
  );

  const afterToday = getMomentFromDayDate({ ...dayDate }).isAfter(
    moment(),
    "day"
  );

  const borderColor =
    created && !afterToday
      ? theme.palette.text.secondary
      : theme.palette.divider;

  const border =
    dayDate.year === -1 ? "none" : `${CELL_BORDER}px ${borderColor} solid`;

  const completedDays =
    yearDataMap[dayDate.year]?.["true"]?.[dataKey.id] || new Set([]);
    
  const completed = completedDays.has(getDateKey(dayDate));

  return (
    <Tooltip title={getMomentFromDayDate({ ...dayDate }).format("MM/DD/YY")}>
      <Box
        sx={{
          width: cellSize,
          height: cellSize,
          border: border,
          borderRadius: 0.5,
          backgroundColor: completed ? "green" : "none",
        }}
      />
    </Tooltip>
  );
};

interface YearGridProps {
  year: number;
  dataKey: DataKey;
}

const YearGrid = ({ year, dataKey }: YearGridProps) => {
  const weeks = useMemo(() => getWeekChunksForYearGrid(year), [year]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
      {weeks.map((week, week_num) => (
        <Stack key={`week_${week_num}`} sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {week.map((dayDate, day_num) => (
            <YearGridDayCell key={`week_${week_num}_day_${day_num}`} dayDate={dayDate} dataKey={dataKey} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default YearGrid;
