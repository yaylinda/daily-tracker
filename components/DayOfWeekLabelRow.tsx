import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { colors } from "../theme";
import { DAY_WIDTH } from "../utils/constants";
import { getDayOfWeekLabels } from "../utils/monthGridUtil";

interface DayOfWeekLabelRowProps {
  month: number;
}

const DayOfWeekLabelRow = ({ month }: DayOfWeekLabelRowProps) => {
  const dayOfWeekLabels = React.useMemo(() => getDayOfWeekLabels(), []);
  const currentMonth = moment().month();

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {dayOfWeekLabels.map((dow, i) => (
        <Box
          key={`dow_${i}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: DAY_WIDTH,
            height: DAY_WIDTH,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            color={month < currentMonth ? colors.LIGHTER_TEXT : colors.TEXT}
          >
            {dow}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DayOfWeekLabelRow;
