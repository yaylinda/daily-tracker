import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { chunk, isEmpty } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import DayDataChip from "../components/DayDataChip";
import useStore from "../store";
import theme from "../theme";
import { DataKey } from "../types";
import {
  getDateKey,
  getDayDateFromMoment,
  getMomentFromDayDate,
  isToday,
  isYesterday,
} from "../utils/dateUtil";

const NUM_CHIPS_PER_ROW = 2;

const AddLifeVariableChip = () => {
  const { openAddDataKeyDialog } = useStore();

  return (
    <Chip
      sx={{
        width: 200,
        justifyContent: "flex-start",
        borderStyle: "dashed",
        color: theme.palette.text.secondary,
      }}
      label="Add Life Variable"
      onClick={openAddDataKeyDialog}
      avatar={
        <Avatar sx={{ background: "none" }}>
          <AddIcon sx={{ color: theme.palette.text.secondary }} />
        </Avatar>
      }
      variant="outlined"
      clickable
    />
  );
};

const TodayPage = () => {
  const {
    year,
    month,
    day,
    dataKeys,
    yearDataMap,
    openAddDataKeyDialog,
    setDisplayDate,
  } = useStore();

  // Number of variables that got marked as completed on this day
  const numCompleted = useMemo(() => {
    const trueData = yearDataMap[year]["true"];
    const dateKey = getDateKey({ year, month, day });
    return Object.keys(trueData).reduce(
      (prev, curr) => (trueData[curr].has(dateKey) ? prev + 1 : prev),
      0
    );
  }, [year, month, day, yearDataMap]);

  // The variables that were created on or before this day, that are available for tracking
  const dataKeysToShow = useMemo(
    () =>
      dataKeys.filter((dataKey) =>
        moment(dataKey.createdAt, "X").isSameOrBefore(
          getMomentFromDayDate({ year, month, day }),
          "day"
        )
      ),
    [year, month, day, dataKeys]
  );

  const nextDay = () =>
    getMomentFromDayDate({ year, month, day }).add(1, "day");

  const prevDay = () =>
    getMomentFromDayDate({ year, month, day }).add(-1, "day");

  const currentDayLabel = () =>
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
        <Card variant="outlined" sx={{ width: "100%" }}>
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
            title={currentDayLabel()}
            subheader={`Completed: ${numCompleted} out of ${dataKeysToShow.length}`}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {isEmpty(dataKeysToShow) &&
              (isToday({ year, month, day }) ? (
                <Button onClick={openAddDataKeyDialog}>
                  Add Life Variables to track
                </Button>
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  No data
                </Typography>
              ))}
            {chunk([...dataKeysToShow, {}], NUM_CHIPS_PER_ROW).map((chips) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                {chips.map((dataKey, index) =>
                  isEmpty(dataKey) ? (
                    isToday({ year, month, day }) && <AddLifeVariableChip />
                  ) : (
                    <DayDataChip
                      key={`chip_${(dataKey as DataKey).id}`}
                      dataKey={dataKey as DataKey}
                      tooltipPlacement={index ? "right" : "left"}
                      isToday={isToday({ year, month, day })}
                    />
                  )
                )}
              </Box>
            ))}
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Tooltip
              title={`Go to ${prevDay().format("ll")}`}
              TransitionComponent={Zoom}
              arrow
            >
              <IconButton
                onClick={() => setDisplayDate(getDayDateFromMoment(prevDay()))}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
            {!isToday({ year, month, day }) && (
              <Tooltip title="Go to Today" TransitionComponent={Zoom} arrow>
                <IconButton
                  onClick={() => setDisplayDate(getDayDateFromMoment(moment()))}
                >
                  <TodayIcon />
                </IconButton>
              </Tooltip>
            )}
            {!isToday({ year, month, day }) && (
              <Tooltip
                title={`Go to ${nextDay().format("ll")}`}
                TransitionComponent={Zoom}
                arrow
              >
                <IconButton
                  onClick={() =>
                    setDisplayDate(getDayDateFromMoment(nextDay()))
                  }
                >
                  <ChevronRightIcon />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </Card>
      </Box>
    </Stack>
  );
};

export default TodayPage;
