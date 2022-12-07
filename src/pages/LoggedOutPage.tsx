import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import useStore from "../store";
import theme from "../theme";

const LoggedOutPage = () => {
  const { openLoginDialog } = useStore();
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        maxWidth: 350,
        color: theme.palette.text.primary,
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        margin: "auto",
      }}
    >
      <Toolbar />
      <Stack>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Track
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          and
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          visualize
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          your
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          life
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          in
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          booleans
        </Typography>
      </Stack>
      <Button variant="outlined" onClick={openLoginDialog}>get started</Button>
    </Stack>
  );
};

export default LoggedOutPage;
