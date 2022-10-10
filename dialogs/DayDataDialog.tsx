import { Dialog, DialogContent, Switch } from "@mui/material";
import React from "react";
import useStore from "../store";
import { DataKey, DayDate } from "../types";
import DialogActionButtons from "./dialogComponents/DialogActionButtons";
import DialogTransition from "./dialogComponents/DialogTransition";

interface DayDataDialogProps {
  dataKey: DataKey;
  dayDate: DayDate;
  value: boolean;
}

const DayDataDialog = ({ dataKey, dayDate, value }: DayDataDialogProps) => {
  const { showDayDataDialog, closeDayDataDialog, addDayData } = useStore();
  const [newValue, setNewValue] = React.useState<boolean>(value);
  const [loading, setLoading] = React.useState<boolean>(false);

  const submit = () => {
    setLoading(true);
    addDayData(dataKey.id, dayDate, newValue);
  };

  const onClose = () => {
    setLoading(false);
    closeDayDataDialog();
  };

  return (
    <Dialog
      onClose={onClose}
      open={showDayDataDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogContent>
        <Switch
          checked={newValue}
          onChange={(event) => {
            setNewValue(event.target.checked);
          }}
        />
      </DialogContent>
      <DialogActionButtons
        withLoading
        loading={loading}
        onCancelClick={onClose}
        onConfirmClick={submit}
      />
    </Dialog>
  );
};

export default DayDataDialog;
