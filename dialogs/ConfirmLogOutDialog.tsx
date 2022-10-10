import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import useStore from "../store";
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
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton sx={{ color: "red" }} onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: "green" }} onClick={signOut}>
          <CheckIcon fontSize="large" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLogOutDialog;
