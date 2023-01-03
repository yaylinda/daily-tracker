import { Avatar, Chip, CircularProgress, Tooltip, Zoom } from "@mui/material";
import { useState } from "react";
import useStore from "../store";
import theme from "../theme";
import { LifeVariable } from "../types";
import { stringToColor } from "../utils/colorUtil";
import { getDayData } from "../utils/yearDataUtils";

const DayDataChip = ({
  lifeVariable,
  tooltipPlacement,
  isToday,
  allowEditPrevDay,
}: {
  lifeVariable: LifeVariable;
  tooltipPlacement: "left" | "right";
  isToday: boolean;
  allowEditPrevDay: boolean;
}) => {
  const [saving, setSaving] = useState<boolean>(false);

  const { year, month, day, yearDataMap, addDayData } = useStore();

  const dataBooleans = getDayData(yearDataMap[year], lifeVariable.id, {
    year,
    month,
    day,
  });
  const { isTrue, isFalse } = dataBooleans;

  const color = stringToColor(lifeVariable.id);

  const updateData = () => {
    if (saving) {
      return;
    }
    setSaving(true);
    addDayData(
      lifeVariable.id,
      { year, month, day },
      isTrue ? false : true
    ).then(() => {
      setSaving(false);
    });
  };

  return (
    <Tooltip
      title={
        isToday || allowEditPrevDay
          ? saving
            ? "Saving..."
            : isTrue
            ? "Undo mark as Complete"
            : "Mark as Complete"
          : "Cannot edit data in the past"
      }
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
        label={lifeVariable.label}
        variant={isTrue ? undefined : "outlined"}
        onClick={() => (isToday || allowEditPrevDay ? updateData() : undefined)}
        clickable={isToday || allowEditPrevDay}
      />
    </Tooltip>
  );
};

export default DayDataChip;
