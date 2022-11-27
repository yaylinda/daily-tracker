import { Box, IconButton, Stack, Typography } from "@mui/material";
import DataKeyItem from "../components/DataKeyItem";
import useStore from "../store";
import theme from "../theme";
import { NavigationTab } from "../types";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const VariablesPage = () => {
  const { navigationTab, dataKeys, openAddDataKeyDialog } = useStore();

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        maxWidth: 500,
        margin: "auto",
        overflow: "hidden",
        height: "100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">My Variables</Typography>
        <IconButton onClick={openAddDataKeyDialog}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Stack sx={{ gap: 2, overflowY: 'scroll', marginBottom: 2}}>
        {dataKeys.map((dataKey) => (
          <DataKeyItem key={`item_${dataKey.id}`} dataKey={dataKey} />
        ))}
      </Stack>
    </Stack>
  );
};

export default VariablesPage;
