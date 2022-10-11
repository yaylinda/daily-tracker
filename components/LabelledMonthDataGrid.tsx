import { Box, Typography } from "@mui/material";
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
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          position: "relative",
          width: DAY_WIDTH,
          backgroundColor: color,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            transform: "rotate(270deg)",
            transformOrigin: "0 0",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: MONTH_WIDTH,
          }}
        >
          {dataKey.label}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: `1px ${color} solid`,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <DayOfWeekLabelRow />
        <MonthDataGrid dataKeyId={dataKey.id} year={year} month={month} />
      </Box>
    </Box>
  );
};

export default LabelledMonthDataGrid;
