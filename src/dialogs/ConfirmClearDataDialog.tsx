import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStore from "../store";
import DialogActionButtons from "./DialogActionButtons";
import DialogTransition from "./DialogTransition";

const ConfirmClearDataDialog = () => {
  const { showConfirmClearDataDialog, clearData, closeConfirmClearDataDialog } =
    useStore();

  return (
    <Dialog
      open={showConfirmClearDataDialog}
      onClose={closeConfirmClearDataDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Clear Data?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
        <Typography variant="body2">
          Are you sure you want to clear all your data from this app? This
          includes daily tracking data, and life variables.
        </Typography>
        <Typography variant="body2">
          This action is not reversable.
        </Typography>
      </DialogContent>
      <DialogActionButtons
        onCancelClick={closeConfirmClearDataDialog}
        onConfirmClick={() => {
          closeConfirmClearDataDialog();
          clearData();
        }}
      />
    </Dialog>
  );
};

export default ConfirmClearDataDialog;
