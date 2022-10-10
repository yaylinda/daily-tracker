import { Dialog, DialogContent, Switch } from "@mui/material";
import invariant from "invariant";
import React from "react";
import useStore from "../store";
import DialogActionButtons from "./dialogComponents/DialogActionButtons";
import DialogTransition from "./dialogComponents/DialogTransition";

const DayDataDialog = () => {
  const {
    showDayDataDialog,
    dayDataDialogDataKeyId,
    dayDataDialogDayDate,
    dayDataDialogValue,
    closeDayDataDialog,
    addDayData,
  } = useStore();

  const [newValue, setNewValue] = React.useState<boolean>(dayDataDialogValue);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (showDayDataDialog) {
      setLoading(false);
      setNewValue(dayDataDialogValue);
    }
  }, [showDayDataDialog, dayDataDialogValue]);

  const submit = () => {
    invariant(
      dayDataDialogDataKeyId !== null && dayDataDialogDayDate !== null,
      "dataKeyId and dayDate must not be null"
    );
    setLoading(true);
    addDayData(dayDataDialogDataKeyId, dayDataDialogDayDate, newValue);
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
