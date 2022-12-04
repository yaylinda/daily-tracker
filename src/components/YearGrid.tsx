import { Box, Stack } from "@mui/material";
import { useMemo } from "react";
import { DayDate } from "../types";
import { getWeekChunksForYearGrid } from "../utils/dateUtil";

const CELL_SIZE = 10;
const CELL_BORDER = 0.5;

interface YearGridDayCellProps {
  dayDate: DayDate;
}

const YearGridDayCell = ({ dayDate }: YearGridDayCellProps) => {

  const cellSize = dayDate.year === -1 ? CELL_SIZE + 2 * CELL_BORDER : CELL_SIZE;
  const border = dayDate.year === -1 ? 'none' : `${CELL_BORDER}px white solid`;

  return (
    <Box
      sx={{
        width: cellSize,
        height: cellSize,
        border: border,
        borderRadius: 0.5,
      }}
    ></Box>
  );
};

interface YearGridProps {
  year: number;
}

const YearGrid = ({ year }: YearGridProps) => {
  const weeks = useMemo(() => getWeekChunksForYearGrid(year), [year]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "2.5px" }}>
      {weeks.map((week) => (
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "2.5px" }}>
          {week.map((dayDate) => (
            <YearGridDayCell dayDate={dayDate} />
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default YearGrid;
