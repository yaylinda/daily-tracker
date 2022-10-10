import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import useStore from "../store";
import DialogTransition from "./DialogTransition";

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
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          variant="standard"
          value={dataKeyLabel}
          onChange={(event) => setDataKeyLabel(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton sx={{ color: "red" }} onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <LoadingButton
          sx={{ color: "green" }}
          onClick={submit}
          disabled={!dataKeyLabel}
          loading={loading}
        >
          <CheckIcon fontSize="large" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataKeyDialog;
