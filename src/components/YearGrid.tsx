import { Box, Stack, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { LifeVariable, DayDate } from "../types";
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
  lifeVariable: LifeVariable;
}

const YearGridDayCell = ({ dayDate, lifeVariable }: YearGridDayCellProps) => {
  const { yearDataMap } = useStore();

  const cellSize =
    dayDate.year === -1 ? CELL_SIZE + 2 * CELL_BORDER : CELL_SIZE;

  const created = moment(lifeVariable.createdAt, "X").isSameOrBefore(
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
    yearDataMap[dayDate.year]?.["true"]?.[lifeVariable.id] || new Set([]);

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
  lifeVariable: LifeVariable;
}

const YearGrid = ({ year, lifeVariable }: YearGridProps) => {
  const weeks = useMemo(() => getWeekChunksForYearGrid(year), [year]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
      {weeks.map((week, week_num) => (
        <Stack key={`week_${week_num}`} sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {week.map((dayDate, day_num) => (
            <YearGridDayCell key={`week_${week_num}_day_${day_num}`} dayDate={dayDate} lifeVariable={lifeVariable} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default YearGrid;
