import { Dialog, DialogContent, Skeleton } from "@mui/material";
import useStore from "../store";
import DayDataDialogContent from "./dialogComponents/DayDataDialogContent";
import DialogTransition from "./dialogComponents/DialogTransition";

const DayDataDialog = () => {
  const { showDayDataDialog, dayDataDialogProps, closeDayDataDialog } =
    useStore();

  return (
    <Dialog
      onClose={closeDayDataDialog}
      open={showDayDataDialog}
      TransitionComponent={DialogTransition}
    >
      <DialogContent>
        {showDayDataDialog && dayDataDialogProps ? (
          <DayDataDialogContent
            dayDate={dayDataDialogProps.dayDate}
            dataKey={dayDataDialogProps.dataKey}
          />
        ) : (
          <>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="rectangular" height={40} />
            <Skeleton variant="rounded" height={40} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DayDataDialog;
