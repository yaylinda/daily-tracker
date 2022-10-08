import GoogleIcon from "@mui/icons-material/Google";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import useUserStore from "../stores/userStore";
import useViewStore from "../stores/viewStore";

const SignInModal = () => {
  const { showLoginDialog, closeLoginDialog } = useViewStore();
  const { isAuthed, signIn } = useUserStore();

  React.useEffect(() => {
    if (isAuthed) {
      closeLoginDialog();
    }
  }, [isAuthed]);

  return (
    <Dialog onClose={closeLoginDialog} open={showLoginDialog}>
      <DialogTitle>Sign In Options</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<GoogleIcon />}
          onClick={() => signIn(false)}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<NoAccountsIcon />}
          onClick={() => signIn(true)}
        >
          Sign in anonymously
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
