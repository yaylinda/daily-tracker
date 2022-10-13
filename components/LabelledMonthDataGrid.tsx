import { Box, Stack, Typography } from "@mui/material";
import useStore from "../store";
import { DataKey } from "../types";
import { stringToColor } from "../utils/colorUtil";
import { DAY_WIDTH, MONTH_WIDTH } from "../utils/constants";
import DayOfWeekLabelRow from "./DayOfWeekLabelRow";
import MonthDataGrid from "./MonthDataGrid";

interface LabelledMonthDataGridProps {
  dataKey: DataKey;
}

const LabelledMonthDataGrid = ({ dataKey }: LabelledMonthDataGridProps) => {
  const { month, year } = useStore();
  const color = stringToColor(dataKey.id);

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: MONTH_WIDTH,
          height: DAY_WIDTH,
          backgroundColor: color,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderLeft: `1px ${color} solid`,
          transformOrigin: "bottom left",
          transform: "rotate(-90deg)",
          bottom: `-${MONTH_WIDTH + 1}px`, // +1px for the left border
          position: "relative",
        }}
      >
        <Typography
          noWrap
          sx={{
            paddingRight: 1,
            paddingLeft: 1,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {dataKey.label}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRight: `1px ${color} solid`,
          borderBottom: `1px ${color} solid`,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <DayOfWeekLabelRow
          containerStyles={{ backgroundColor: color, borderTopRightRadius: 5 }}
        />
        <MonthDataGrid dataKey={dataKey} year={year} month={month} />
      </Box>
    </Stack>
  );
};

export default LabelledMonthDataGrid;
