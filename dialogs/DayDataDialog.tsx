import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { includes } from "lodash";
import moment from "moment";
import React from "react";
import useStore from "../store";
import { DataKey, DayDate } from "../types";
import { stringToColor } from "../utils/colorUtil";
import { getDayData } from "../utils/yearDataUtils";
import DialogTransition from "./dialogComponents/DialogTransition";

const selectionRowHeight = 40;

interface DayDataKeyValueSelectionProps {
  dataKey: DataKey;
  value: boolean | null;
  loading: boolean;
  onChange: (value: boolean) => void;
}

const DayDataKeyValueSelection = ({
  dataKey,
  value,
  loading,
  onChange,
}: DayDataKeyValueSelectionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: selectionRowHeight,
        overflowY: "hidden",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box
          sx={{
            height: selectionRowHeight,
            width: 20,
            backgroundColor: stringToColor(dataKey.id),
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            alignSelf: "center",
            width: 250,
            height: selectionRowHeight,
            textOverflow: "ellipsis",
            verticalAlign: "middle",
            lineHeight: `${selectionRowHeight}px`,
          }}
        >
          {dataKey.label}
        </Typography>
      </Box>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, newValue) => {
          if (newValue === null || value === newValue) {
            return;
          }
          onChange(newValue);
        }}
      >
        <ToggleButton value={false} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <CloseIcon fontSize="small" sx={{ color: "red" }} />
          )}
        </ToggleButton>
        <ToggleButton value={true} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <CheckIcon fontSize="small" sx={{ color: "green" }} />
          )}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

interface DayDataDialogProps {
  open: boolean;
  dayDate: DayDate;
  dataKeys: DataKey[];
  onClose: () => void;
}

const DayDataDialog = ({
  open,
  dayDate,
  dataKeys,
  onClose,
}: DayDataDialogProps) => {
  const { yearData, addDayData } = useStore((state) => ({
    yearData: state.yearDataMap[dayDate.year],
    addDayData: state.addDayData,
  }));

  const dataKeyValues = React.useMemo(
    () =>
      dataKeys.reduce((prev, curr) => {
        const { isTrue, isFalse } = getDayData(yearData, curr.id, dayDate);
        prev[curr.id] = {
          value: isTrue ? true : isFalse ? false : null,
          dataKey: curr,
        };
        return prev;
      }, {} as { [dataKeyId in string]: { value: boolean | null; dataKey: DataKey } }),
    [yearData]
  );

  const [submittingDataKeys, setSubmittingDataKeys] = React.useState<string[]>(
    []
  );

  const onDataKeyValueUpdate = (dataKeyId: string, value: boolean) => {
    setSubmittingDataKeys((current) => [...current, dataKeyId]);
    addDayData(dataKeyId, dayDate, value).then(() => {
      setSubmittingDataKeys((current) =>
        current.filter((id) => id !== dataKeyId)
      );
    });
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={DialogTransition}
    >
      {open && (
        <DialogTitle>
          {moment(new Date(dayDate.year, dayDate.month, dayDate.day)).format(
            "LL"
          )}
        </DialogTitle>
      )}
      <DialogContent>
        <Stack sx={{ gap: 2 }}>
          {Object.values(dataKeyValues).map(({ dataKey, value }) => (
            <DayDataKeyValueSelection
              key={dataKey.id}
              dataKey={dataKey}
              value={value}
              onChange={(value) => onDataKeyValueUpdate(dataKey.id, value)}
              loading={includes(submittingDataKeys, dataKey.id)}
            />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DayDataDialog;
