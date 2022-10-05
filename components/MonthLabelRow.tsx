import { Box, Typography } from "@mui/material";
import React from "react";
import { DATA_KEY_LABEL_WIDTH, MONTH_WIDTH } from "../utils/constants";
import { getMonthLabels } from "../utils/monthGridUtil";
import DayOfWeekLabelRow from "./DayOfWeekLabelRow";
import DataKeyCell from "./DataKeyCell";

const MonthLabelRow = () => {
  const monthLabels = React.useMemo(() => getMonthLabels(), []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <DataKeyCell dataKeyLabel="" />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {monthLabels.map((monthLabel) => (
          <Box
            key={`${monthLabel}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: MONTH_WIDTH,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{monthLabel}</Typography>
            <DayOfWeekLabelRow />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MonthLabelRow;
