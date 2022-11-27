import { Stack, Typography } from "@mui/material";
import useStore from "../store";
import theme from "../theme";

const StatsPage = () => {
  const { navigationTab } = useStore();

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        paddingTop: 4,
        maxWidth: 500,
        margin: "auto",
        gap: 4,
      }}
    >
      <Typography variant="h6">Statistics</Typography>
    </Stack>
  );
};

export default StatsPage;
