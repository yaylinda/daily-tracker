import { Avatar, Chip, CircularProgress, Tooltip, Zoom } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import useStore from "../store";
import theme from "../theme";
import { DataKey } from "../types";
import { stringToColor } from "../utils/colorUtil";
import { getMomentFromDayDate } from "../utils/dateUtil";
import { getDayData } from "../utils/yearDataUtils";

const DayDataChip = ({
  dataKey,
  tooltipPlacement,
  isToday,
}: {
  dataKey: DataKey;
  tooltipPlacement: "left" | "right";
  isToday: boolean;
}) => {
  const [saving, setSaving] = useState<boolean>(false);

  const { year, month, day, yearDataMap, addDayData } = useStore();

  const dataBooleans = getDayData(yearDataMap[year], dataKey.id, {
    year,
    month,
    day,
  });
  const { isTrue, isFalse } = dataBooleans;

  const color = stringToColor(dataKey.id);

  const updateData = () => {
    if (saving) {
      return;
    }
    setSaving(true);
    addDayData(dataKey.id, { year, month, day }, isTrue ? false : true).then(
      () => {
        setSaving(false);
      }
    );
  };

  return (
    <Tooltip
      title={isToday ? saving ? "Saving..." : isTrue ? "Undo mark as Complete" : "Mark as Complete" : 'Cannot edit data in the past'}
      placement={tooltipPlacement}
      TransitionComponent={Zoom}
      arrow
    >
      <Chip
        sx={{ width: 200, justifyContent: "flex-start" }}
        avatar={
          saving ? (
            <Avatar
              sx={{
                backgroundColor: theme.palette.background.paper,
                display: "flex",
              }}
            >
              <CircularProgress
                sx={{ width: "24px !important", height: "24px !important" }}
              />
            </Avatar>
          ) : (
            <Avatar
              sx={{
                backgroundColor: isTrue
                  ? color
                  : theme.palette.background.paper,
                border: isTrue ? undefined : `2px ${color} solid`,
                width: isTrue ? 24 : `20px !important`,
                height: isTrue ? 24 : `20px !important`,
              }}
            >
              {" "}
            </Avatar>
          )
        }
        label={dataKey.label}
        variant={isTrue ? undefined : "outlined"}
        onClick={() => isToday ? updateData() : undefined}
        clickable={isToday}
      />
    </Tooltip>
  );
};

export default DayDataChip;
