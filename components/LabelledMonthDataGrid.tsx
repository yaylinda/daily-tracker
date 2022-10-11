import { Box, Typography } from "@mui/material";
import useStore from "../store";
import { DataKey } from "../types";
import DayOfWeekLabelRow from "./DayOfWeekLabelRow";
import MonthDataGrid from "./MonthDataGrid";

interface LabelledMonthDataGridProps {
  dataKey: DataKey;
}

const LabelledMonthDataGrid = ({ dataKey }: LabelledMonthDataGridProps) => {
  const { month, year } = useStore();
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Typography>{dataKey.label}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <DayOfWeekLabelRow />
        <MonthDataGrid dataKeyId={dataKey.id} year={year} month={month} />
      </Box>
    </Box>
  );
};

export default LabelledMonthDataGrid;
