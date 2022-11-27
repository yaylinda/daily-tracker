import { Box, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import useStore from "../store";
import DialogActionButtons from "./dialogComponents/DialogActionButtons";
import DialogTransition from "./dialogComponents/DialogTransition";

const StarRatingDialog = () => {

  const { showStarRatingDialog, closeShowStarRatingDialog } = useStore();
  
  return (
    <Dialog
      onClose={closeShowStarRatingDialog}
      open={showStarRatingDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Rate your day</DialogTitle>
      <DialogContent>
        
      </DialogContent>
    </Dialog>
  );
}

export default StarRatingDialog;