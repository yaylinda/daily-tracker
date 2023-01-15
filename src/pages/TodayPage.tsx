import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import {
  Avatar,
  Box, Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  Zoom
} from "@mui/material";
import { chunk, isEmpty } from "lodash";
import moment from "moment";
import { useMemo, useState } from "react";
import DayDataChip from "../components/DayDataChip";
import useStore from "../store";
import theme from "../theme";
import { LifeVariable } from "../types";
import {
  getDateKey,
  getDayDateFromMoment,
  getMomentFromDayDate,
  isToday,
  isYesterday
} from "../utils/dateUtil";

const NUM_CHIPS_PER_ROW = 2;

const AddLifeVariableChip = () => {
  const { openAddLifeVariableDialog } = useStore();

  return (
    <Chip
      sx={{
        width: 200,
        justifyContent: "flex-start",
        borderStyle: "dashed",
        color: theme.palette.text.secondary,
      }}
      label="Add Life Variable"
      onClick={openAddLifeVariableDialog}
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
    lifeVariables,
    yearDataMap,
    openAddLifeVariableDialog,
    setDisplayDate,
  } = useStore();

  const [allowEditPrevDay, setAllowEditPrevDay] = useState(false);

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
  const lifeVariablesToShow = useMemo(
    () =>
      lifeVariables.filter((lifeVariable) =>
        getMomentFromDayDate(lifeVariable.createdAt).isSameOrBefore(
          getMomentFromDayDate({ year, month, day }),
          "day"
        )
      ),
    [year, month, day, lifeVariables]
  );

  const nextDay = () =>
    getMomentFromDayDate({ year, month, day }).add(1, "day");

  const prevDay = () =>
    getMomentFromDayDate({ year, month, day }).add(-1, "day");

  const currentDayLabel = () =>
    isToday({ year, month, day })
      ? `Today (${getMomentFromDayDate({ year, month, day }).format('ddd')})`
      : isYesterday({ year, month, day })
      ? `Yesterday (${getMomentFromDayDate({ year, month, day }).format('ddd')})`
      : getMomentFromDayDate({ year, month, day }).format("ddd, LL");

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        maxWidth: 500,
        margin: "auto",
        height: "100%",
        overflow: "hidden",
        "&::-webkit-scrollbar": {
          background: "transparent",
          display: "none",
          width: 0,
          height: 0,
        },
      }}
    >
      <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
          subheader={`Completed: ${numCompleted} out of ${lifeVariablesToShow.length}`}
          action={
            isToday({ year, month, day }) ? undefined : (
              <Switch
                checked={allowEditPrevDay}
                onChange={() => setAllowEditPrevDay(!allowEditPrevDay)}
              />
            )
          }
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "scroll",
          }}
        >
          {isEmpty(lifeVariablesToShow) && !isToday({ year, month, day }) && (
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                color: theme.palette.text.secondary,
              }}
            >
              No data
            </Typography>
          )}
          {chunk([...lifeVariablesToShow, {}], NUM_CHIPS_PER_ROW).map(
            (chips, row_num) => (
              <Box
                key={`row_${row_num}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                {chips.map((lifeVariable, index) =>
                  isEmpty(lifeVariable) ? (
                    isToday({ year, month, day }) && (
                      <AddLifeVariableChip key={`add_chip`} />
                    )
                  ) : (
                    <DayDataChip
                      key={`chip_${(lifeVariable as LifeVariable).id}`}
                      lifeVariable={lifeVariable as LifeVariable}
                      tooltipPlacement={index ? "right" : "left"}
                      isToday={isToday({ year, month, day })}
                      allowEditPrevDay={allowEditPrevDay}
                    />
                  )
                )}
              </Box>
            )
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip
            title={`Go to ${prevDay().format("ll")}`}
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton
              disabled={month === 0 && day === 1}
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
          <Tooltip
            title={`Go to ${nextDay().format("ll")}`}
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton
              disabled={isToday({ year, month, day })}
              onClick={() => setDisplayDate(getDayDateFromMoment(nextDay()))}
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default TodayPage;
