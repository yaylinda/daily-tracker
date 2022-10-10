import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React from "react";
import useStore from "../store";
import DialogActionButtons from "./dialogComponents/DialogActionButtons";
import DialogTransition from "./dialogComponents/DialogTransition";

const AddDataKeyDialog = () => {
  const { showAddDataKeyDialog, closeAddDataKeyDialog, addDataKey } =
    useStore();

  const [dataKeyLabel, setDataKeyLabel] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

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
      <DialogTitle>New Life Attribute</DialogTitle>
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

export default AddDataKeyDialog;
