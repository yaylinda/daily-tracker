import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../theme";
import { DAY_WIDTH } from "../utils/constants";
import { getDayOfWeekLabels } from "../utils/monthGridUtil";

const DayOfWeekLabelRow = () => {
  const dayOfWeekLabels = React.useMemo(() => getDayOfWeekLabels(), []);

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
          <Typography variant="overline" color={colors.TEXT}>
            {dow}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DayOfWeekLabelRow;
