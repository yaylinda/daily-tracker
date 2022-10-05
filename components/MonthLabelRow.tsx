import { Box, Typography } from "@mui/material";
import React from "react";
import { DATA_KEY_LABEL_WIDTH, MONTH_WIDTH } from "../utils/constants";
import { getMonthLabels } from "../utils/monthGridUtil";
import DayOfWeekLabelRow from "./DayOfWeekLabelRow";
import DataKeyCell from "./DataKeyCell";
import moment from "moment";
import { colors } from "../theme";

const MonthLabelRow = () => {
  const monthLabels = React.useMemo(() => getMonthLabels(), []);
  const currentMonth = moment().month();

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <DataKeyCell dataKeyLabel="" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          gap: 2,
        }}
      >
        {monthLabels.map((monthLabel, month) => (
          <Box
            key={`${monthLabel}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: MONTH_WIDTH,
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              color={month < currentMonth ? colors.LIGHTER_TEXT : colors.TEXT}
            >
              {monthLabel}
            </Typography>
            <DayOfWeekLabelRow month={month} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MonthLabelRow;
