import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { DialogActions, IconButton } from "@mui/material";

interface DialogActionButtonsProps {
  withLoading?: boolean;
  loading?: boolean;
  confirmDisabled?: boolean;
  onCancelClick: () => void;
  onConfirmClick: () => void;
}

const DialogActionButtons = ({
  withLoading = false,
  loading = false,
  confirmDisabled = false,
  onCancelClick,
  onConfirmClick,
}: DialogActionButtonsProps) => {
  return (
    <DialogActions sx={{ justifyContent: "space-between" }}>
      <IconButton
        sx={{ color: "red" }}
        onClick={onCancelClick}
        disabled={loading}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      {withLoading ? (
        <LoadingButton
          sx={{ color: "green" }}
          onClick={onConfirmClick}
          loading={loading}
          disabled={confirmDisabled}
        >
          <CheckIcon fontSize="large" />
        </LoadingButton>
      ) : (
        <IconButton
          sx={{ color: "green" }}
          onClick={onConfirmClick}
          disabled={confirmDisabled}
        >
          <CheckIcon fontSize="large" />
        </IconButton>
      )}
    </DialogActions>
  );
};

export default DialogActionButtons;
