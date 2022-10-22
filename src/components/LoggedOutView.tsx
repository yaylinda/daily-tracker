import { Box, Button, Toolbar, Typography } from "@mui/material";
import useStore from "../store";
import theme from "../theme";

const LoggedOutView = () => {
  const { openLoginDialog } = useStore();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: 400,
        color: theme.palette.text.primary,
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        margin: "auto",
      }}
    >
      <Toolbar />
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Track and visualize your life in booleans
      </Typography>
      <Button onClick={openLoginDialog}>get started</Button>
    </Box>
  );
};

export default LoggedOutView;
