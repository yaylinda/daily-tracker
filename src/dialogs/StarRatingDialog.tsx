import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useStore from "../store";
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