import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import useStore from "../store";
import { colors } from "../theme";
import { MONTH_WIDTH } from "../utils/constants";
import { getMonthLabels } from "../utils/dateUtil";
import DataKeyCell from "./DataKeyCell";
import DayOfWeekLabelRow from "./DayOfWeekLabelRow";

const MonthLabelRow = () => {
  const monthLabels = React.useMemo(() => getMonthLabels(), []);
  const currentMonth = moment().month();
  const rowRef = React.useRef<HTMLDivElement>();
  const { setLeftScroll, leftScroll } = useStore();

  React.useEffect(() => {
    if (rowRef && rowRef.current) {
      rowRef.current.scrollLeft = leftScroll;
    }
  }, [leftScroll]);

  const onScroll = () => {
    if (rowRef && rowRef.current) {
      const { scrollLeft } = rowRef.current;
      setLeftScroll(scrollLeft);
    }
  };

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
        ref={rowRef}
        onScroll={onScroll}
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
            <Typography variant="subtitle2" color={colors.TEXT}>
              {monthLabel}
            </Typography>
            <DayOfWeekLabelRow />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MonthLabelRow;
