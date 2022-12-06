import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStore from "../store";
import DialogActionButtons from "./DialogActionButtons";
import DialogTransition from "./DialogTransition";

interface ConfirmLogOutDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmLogOutDialog = ({ open, onClose }: ConfirmLogOutDialogProps) => {
  const { isAnon, signOut } = useStore();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        {isAnon && (
          <Typography>
            As an Anonymous User, you will not be able to recover your data if
            you log out without linking your Google Account
          </Typography>
        )}
        <Typography>Are you sure you want to log out?</Typography>
      </DialogContent>
      <DialogActionButtons onCancelClick={onClose} onConfirmClick={signOut} />
    </Dialog>
  );
};

export default ConfirmLogOutDialog;
