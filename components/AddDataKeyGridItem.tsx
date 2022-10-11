import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import useStore from "../store";
import { colors } from "../theme";
import { DAY_WIDTH, MONTH_WIDTH } from "../utils/constants";

const AddDataKeyGridItem = () => {
  const { openAddDataKeyDialog } = useStore();

  return (
    <IconButton
      sx={{
        height: MONTH_WIDTH,
        width: MONTH_WIDTH + DAY_WIDTH,
        borderColor: colors.LIGHTER_TEXT,
        borderWidth: "3px",
        borderStyle: "dashed",
        borderRadius: "10px",
        color: colors.LIGHTER_TEXT,
      }}
      size="large"
      onClick={openAddDataKeyDialog}
    >
      <AddCircleIcon sx={{ height: 50, width: 50 }} />
    </IconButton>
  );
};

export default AddDataKeyGridItem;
