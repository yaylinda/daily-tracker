import GoogleIcon from "@mui/icons-material/Google";
import { Button, Dialog, DialogContent } from "@mui/material";
import useStore from "../store";
import DialogTransition from "./DialogTransition";

const LogInDialog = () => {
  const { showLoginDialog, closeLoginDialog, isAuthed, isAnon, signIn } =
    useStore();

  return (
    <Dialog
      onClose={closeLoginDialog}
      open={showLoginDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<GoogleIcon />}
          onClick={() => signIn(false)}
        >
          Log in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LogInDialog;
