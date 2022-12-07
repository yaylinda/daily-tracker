import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStore from "../store";
import DialogActionButtons from "./DialogActionButtons";
import DialogTransition from "./DialogTransition";

const ConfirmLogOutDialog = () => {
  const { showConfirmLogoutDialog, signOut, closeConfirmLogoutDialog } =
    useStore();

  return (
    <Dialog
      open={showConfirmLogoutDialog}
      onClose={closeConfirmLogoutDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body2">Are you sure you want to log out?</Typography>
      </DialogContent>
      <DialogActionButtons
        onCancelClick={closeConfirmLogoutDialog}
        onConfirmClick={() => {
          closeConfirmLogoutDialog();
          signOut();
        }}
      />
    </Dialog>
  );
};

export default ConfirmLogOutDialog;
