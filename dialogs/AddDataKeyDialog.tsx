import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import useStore from "../store";

const AddDataKeyDialog = () => {
  const { showAddDataKeyDialog, closeAddDataKeyDialog, addDataKey } =
    useStore();

  return (
    <Dialog onClose={closeAddDataKeyDialog} open={showAddDataKeyDialog}>
      <DialogTitle>New Life Attribute</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      ></DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton sx={{ color: "red" }} onClick={closeAddDataKeyDialog}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: "green" }} onClick={() => addDataKey("asdf")}>
          <CheckIcon fontSize="large" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataKeyDialog;
