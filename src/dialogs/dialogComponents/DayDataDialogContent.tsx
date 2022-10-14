import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { includes } from "lodash";
import moment from "moment";
import React from "react";
import useStore from "../../store";
import { DataKey, DayDate } from "../../types";
import { getDayDateFromMoment } from "../../utils/dateUtil";
import { getDayData } from "../../utils/yearDataUtils";
import DataKeyValueSelection from "./DataKeyValueSelection";

interface DayDataDialogContentProps {
  dayDate: DayDate;
  dataKey: DataKey;
}

const DayDataDialogContent = ({
  dayDate,
  dataKey,
}: DayDataDialogContentProps) => {
  const { yearData, dataKeys, addDayData, closeDayDataDialog } = useStore(
    (state) => ({
      yearData: state.yearDataMap[dayDate.year],
      dataKeys: state.dataKeys,
      addDayData: state.addDayData,
      closeDayDataDialog: state.closeDayDataDialog,
    })
  );

  const [currentMoment, setCurrentMoment] = React.useState(
    moment().year(dayDate.year).month(dayDate.month).date(dayDate.day)
  );

  const [expanded, setExpanded] = React.useState(false);

  const dataKeyValues = React.useMemo(
    () =>
      (expanded ? dataKeys : [dataKey]).reduce((prev, curr) => {
        const { isTrue, isFalse } = getDayData(
          yearData,
          curr.id,
          getDayDateFromMoment(currentMoment)
        );
        prev[curr.id] = {
          value: isTrue ? true : isFalse ? false : null,
          dataKey: curr,
        };
        return prev;
      }, {} as { [dataKeyId in string]: { value: boolean | null; dataKey: DataKey } }),
    [yearData, currentMoment, dataKeys, dataKey, expanded]
  );

  const [submittingDataKeys, setSubmittingDataKeys] = React.useState<string[]>(
    []
  );

  const onDataKeyValueUpdate = (dataKeyId: string, value: boolean) => {
    setSubmittingDataKeys((current) => [...current, dataKeyId]);
    addDayData(dataKeyId, getDayDateFromMoment(currentMoment), value).then(
      () => {
        setSubmittingDataKeys((current) =>
          current.filter((id) => id !== dataKeyId)
        );
        if (Object.keys(dataKeyValues).length === 1) {
          // Auto-close the dialog if only updating 1 data key
          // setTimeout(() => closeDayDataDialog(), 250);
        }
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">{currentMoment.format("LL")}</Typography>
        <Box>
          <IconButton
            disabled={currentMoment
              .clone()
              .subtract(1, "day")
              .isBefore(moment(), "month")}
            onClick={() => {
              setCurrentMoment((curr) => curr.clone().subtract(1, "day"));
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            disabled={currentMoment
              .clone()
              .add(1, "day")
              .isAfter(moment(), "day")}
            onClick={() =>
              setCurrentMoment((curr) => curr.clone().add(1, "day"))
            }
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Stack sx={{ gap: 2 }}>
        <DataKeyValueSelection
          key={dataKey.id}
          dataKey={dataKeyValues[dataKey.id].dataKey}
          value={dataKeyValues[dataKey.id].value}
          onChange={(value) => onDataKeyValueUpdate(dataKey.id, value)}
          loading={includes(submittingDataKeys, dataKey.id)}
        />
        <Collapse in={expanded} timeout="auto">
          <Stack sx={{ gap: 2 }}>
            {Object.values(dataKeyValues)
              .filter((dataKeyValue) => dataKeyValue.dataKey.id !== dataKey.id)
              .map((dataKeyValue) => (
                <DataKeyValueSelection
                  key={dataKeyValue.dataKey.id}
                  dataKey={dataKeyValue.dataKey}
                  value={dataKeyValue.value}
                  onChange={(value) =>
                    onDataKeyValueUpdate(dataKeyValue.dataKey.id, value)
                  }
                  loading={includes(
                    submittingDataKeys,
                    dataKeyValue.dataKey.id
                  )}
                />
              ))}
          </Stack>
        </Collapse>
        {dataKeys.length > 1 && (
          <Button onClick={() => setExpanded((curr) => !curr)}>
            {expanded ? "Hide" : "Show all"}
          </Button>
        )}
      </Stack>
    </>
  );
};

export default DayDataDialogContent;
