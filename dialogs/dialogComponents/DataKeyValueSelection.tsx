import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from "@mui/material";
import { DataKey } from "../../types";
import { stringToColor } from "../../utils/colorUtil";

const selectionRowHeight = 40;

interface DataKeyValueSelectionProps {
  dataKey: DataKey;
  value: boolean | null;
  loading: boolean;
  onChange: (value: boolean) => void;
}

const DataKeyValueSelection = ({
  dataKey,
  value,
  loading,
  onChange,
}: DataKeyValueSelectionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: selectionRowHeight,
        overflowY: "hidden",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box
          sx={{
            height: selectionRowHeight,
            width: 20,
            backgroundColor: stringToColor(dataKey.id),
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            alignSelf: "center",
            width: 250,
            height: selectionRowHeight,
            textOverflow: "ellipsis",
            verticalAlign: "middle",
            lineHeight: `${selectionRowHeight}px`,
          }}
        >
          {dataKey.label}
        </Typography>
      </Box>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, newValue) => {
          if (newValue === null || value === newValue) {
            return;
          }
          onChange(newValue);
        }}
      >
        <ToggleButton value={false} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <CloseIcon fontSize="small" sx={{ color: "red" }} />
          )}
        </ToggleButton>
        <ToggleButton value={true} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <CheckIcon fontSize="small" sx={{ color: "green" }} />
          )}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DataKeyValueSelection;
