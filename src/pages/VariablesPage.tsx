import {
  Stack,
  Typography
} from "@mui/material";
import DataKeyItem from "../components/DataKeyItem";
import useStore from "../store";
import theme from "../theme";
import { NavigationTab } from "../types";

const VariablesPage = () => {
  const { navigationTab, dataKeys } = useStore();

  if (navigationTab !== NavigationTab.VARIABLES) {
    return null;
  }

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        paddingTop: 5,
        maxWidth: 500,
        margin: "auto",
        gap: 4,
      }}
    >
      <Typography variant="h4">My Variables</Typography>
      <Stack sx={{ gap: 2 }}>
        {dataKeys.map((dataKey) => (
          <DataKeyItem key={`item_${dataKey.id}`} dataKey={dataKey} />
        ))}
      </Stack>
    </Stack>
  );
};

export default VariablesPage;
