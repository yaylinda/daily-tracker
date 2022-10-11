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
          border: `1px ${color} solid`,
          borderBottom: "none",
          transformOrigin: "bottom left",
          transform: "rotate(-90deg)",
          bottom: `-${MONTH_WIDTH + 2}px`,
          position: "relative",
        }}
      >
        <Typography
          noWrap
          variant="subtitle2"
          sx={{ paddingRight: 1, paddingLeft: 1 }}
        >
          {dataKey.label}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: `1px ${color} solid`,
          borderLeft: "none",
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <DayOfWeekLabelRow />
        <MonthDataGrid dataKeyId={dataKey.id} year={year} month={month} />
      </Box>
    </Stack>
  );
};

export default LabelledMonthDataGrid;
