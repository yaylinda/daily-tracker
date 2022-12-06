import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React from "react";
import useStore from "../store";
import DialogActionButtons from "./DialogActionButtons";
import DialogTransition from "./DialogTransition";

const AddLifeVariableDialog = () => {
  const { showAddLifeVariableDialog, closeAddLifeVariableDialog, addLifeVariable } =
    useStore();

  const [lifeVariableLabel, setLifeVariableLabel] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (showAddLifeVariableDialog) {
      setLoading(false);
      setLifeVariableLabel("");
    }
  }, [showAddLifeVariableDialog]);

  const submit = () => {
    setLoading(true);
    addLifeVariable(lifeVariableLabel);
  };

  const onClose = () => {
    setLifeVariableLabel("");
    setLoading(false);
    closeAddLifeVariableDialog();
  };

  return (
    <Dialog
      onClose={onClose}
      open={showAddLifeVariableDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>New Life Variable</DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          value={lifeVariableLabel}
          onChange={(event) => setLifeVariableLabel(event.target.value)}
        />
      </DialogContent>
      <DialogActionButtons
        withLoading
        loading={loading}
        confirmDisabled={!lifeVariableLabel}
        onCancelClick={onClose}
        onConfirmClick={submit}
      />
    </Dialog>
  );
};

export default AddLifeVariableDialog;
