import { Box, Typography } from "@mui/material";

const LoggedOutView = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "50%",
      }}
    >
      <Typography variant="h2">
        Track and visualize your years in booleans
      </Typography>
      <Typography>Sign in to get started!</Typography>
    </Box>
  );
};

export default LoggedOutView;
