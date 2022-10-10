import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SliderValueLabel,
  TextField,
} from "@mui/material";
import React from "react";
import useStore from "../store";

const AddDataKeyDialog = () => {
  const { showAddDataKeyDialog, closeAddDataKeyDialog, addDataKey } =
    useStore();

  const [dataKeyLabel, setDataKeyLabel] = React.useState<string>("");

  return (
    <Dialog onClose={closeAddDataKeyDialog} open={showAddDataKeyDialog}>
      <DialogTitle>New Life Attribute</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          variant="standard"
          value={dataKeyLabel}
          onChange={(event) => setDataKeyLabel(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton sx={{ color: "red" }} onClick={closeAddDataKeyDialog}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton
          sx={{ color: "green" }}
          onClick={() => addDataKey(dataKeyLabel)}
          disabled={!dataKeyLabel}
        >
          <CheckIcon fontSize="large" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataKeyDialog;
