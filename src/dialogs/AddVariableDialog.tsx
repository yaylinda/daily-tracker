import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React from "react";
import useStore from "../store";
import DialogActionButtons from "./DialogActionButtons";
import DialogTransition from "./DialogTransition";

const AddVariableDialog = () => {
  const { showAddDataKeyDialog, closeAddDataKeyDialog, addDataKey } =
    useStore();

  const [dataKeyLabel, setDataKeyLabel] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (showAddDataKeyDialog) {
      setLoading(false);
      setDataKeyLabel("");
    }
  }, [showAddDataKeyDialog]);

  const submit = () => {
    setLoading(true);
    addDataKey(dataKeyLabel);
  };

  const onClose = () => {
    setDataKeyLabel("");
    setLoading(false);
    closeAddDataKeyDialog();
  };

  return (
    <Dialog
      onClose={onClose}
      open={showAddDataKeyDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>New Life Variable</DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          value={dataKeyLabel}
          onChange={(event) => setDataKeyLabel(event.target.value)}
        />
      </DialogContent>
      <DialogActionButtons
        withLoading
        loading={loading}
        confirmDisabled={!dataKeyLabel}
        onCancelClick={onClose}
        onConfirmClick={submit}
      />
    </Dialog>
  );
};

export default AddVariableDialog;
