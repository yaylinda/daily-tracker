import { Box, SxProps, Typography } from "@mui/material";
import React from "react";
import { colors } from "../theme";
import { DAY_WIDTH } from "../utils/constants";
import { getDayOfWeekLabels } from "../utils/dateUtil";

interface DayOfWeekLabelRowProps {
  containerStyles: SxProps;
}

const DayOfWeekLabelRow = ({ containerStyles }: DayOfWeekLabelRowProps) => {
  const dayOfWeekLabels = React.useMemo(() => getDayOfWeekLabels(), []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        ...containerStyles,
      }}
    >
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
            color={colors.TEXT}
            sx={{ fontSize: 10, fontWeight: "bold" }}
          >
            {dow}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DayOfWeekLabelRow;
