import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { chunk } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import DayDataChip from "../components/DayDataChip";
import useStore from "../store";
import theme from "../theme";
import {
  getDateKey,
  getDayDateFromMoment,
  getMomentFromDayDate,
  isToday,
  isYesterday
} from "../utils/dateUtil";

const NUM_CHIPS_PER_ROW = 2;

const TodayPage = () => {
  const {
    year,
    month,
    day,
    dataKeys,
    yearDataMap,
    openShowStarRatingDialog,
    setDisplayDate,
  } = useStore();

  const numChecked = useMemo(() => {
    const trueData = yearDataMap[year]["true"];
    const dateKey = getDateKey({ year, month, day });
    return Object.keys(trueData).reduce(
      (prev, curr) => (trueData[curr].has(dateKey) ? prev + 1 : prev),
      0
    );
  }, [year, month, day, yearDataMap]);

  const nextDay = () => {
    setDisplayDate(
      getDayDateFromMoment(
        getMomentFromDayDate({ year, month, day }).add(1, "day")
      )
    );
  };

  const prevDay = () => {
    setDisplayDate(
      getDayDateFromMoment(
        getMomentFromDayDate({ year, month, day }).add(-1, "day")
      )
    );
  };

  const dayLabel = () =>
    isToday({ year, month, day })
      ? "Today"
      : isYesterday({ year, month, day })
      ? "Yesterday"
      : getMomentFromDayDate({ year, month, day }).format("LL");

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        width: 500,
        margin: "auto",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", marginTop: "auto", marginBottom: "auto" }}>
        <Card variant="outlined">
          <CardHeader
            sx={{ color: theme.palette.text.primary }}
            avatar={
              <Avatar
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  border: `2px ${theme.palette.text.primary} solid`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {day}
                </Typography>
              </Avatar>
            }
            title={dayLabel()}
            subheader={`Completed: ${numChecked} out of ${dataKeys.length}`}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {chunk(dataKeys, NUM_CHIPS_PER_ROW).map((chips) => (
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2 }}>
                {chips.map((dataKey) => (
                  <DayDataChip key={`chip_${dataKey.id}`} dataKey={dataKey} />
                ))}
              </Box>
            ))}
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <IconButton onClick={prevDay}>
              <ChevronLeftIcon />
            </IconButton>
            {!isToday({ year, month, day }) &&
              !isYesterday({ year, month, day }) && (
                <IconButton
                  onClick={() => setDisplayDate(getDayDateFromMoment(moment()))}
                >
                  <TodayIcon />
                </IconButton>
              )}
            {!isToday({ year, month, day }) && (
              <IconButton onClick={nextDay}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </Box>
    </Stack>
  );
};

export default TodayPage;
