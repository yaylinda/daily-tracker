import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import useScrollStore from "../stores/scrollStore";
import { colors } from "../theme";
import { MONTH_WIDTH } from "../utils/constants";
import { getMonthLabels } from "../utils/monthGridUtil";
import DataKeyCell from "./DataKeyCell";
import DayOfWeekLabelRow from "./DayOfWeekLabelRow";

const MonthLabelRow = () => {
  const monthLabels = React.useMemo(() => getMonthLabels(), []);
  const currentMonth = moment().month();
  const rowRef = React.useRef<HTMLDivElement>();
  const { setLeftScroll, leftScroll } = useScrollStore();

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
