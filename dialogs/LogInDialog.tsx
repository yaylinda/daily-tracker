import GoogleIcon from "@mui/icons-material/Google";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import useStore from "../store";

const SignInModal = () => {
  const { showLoginDialog, closeLoginDialog, isAuthed, isAnon, signIn } =
    useStore();

  return (
    <Dialog onClose={closeLoginDialog} open={showLoginDialog}>
      <DialogTitle>{isAnon ? "Link Account" : "Log In Options"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<GoogleIcon />}
          onClick={() => signIn(false)}
        >
          Log in with Google
        </Button>
        {!(isAuthed && isAnon) && (
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<NoAccountsIcon />}
            onClick={() => signIn(true)}
          >
            Use without logging in
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
