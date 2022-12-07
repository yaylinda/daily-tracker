import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import useStore from "../store";
import theme from "../theme";

const SettingsPage = () => {

  const { openConfirmLogoutDialog, openConfirmClearDataDialog } = useStore();

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        maxWidth: 500,
        margin: "auto",
        overflow: "hidden",
        height: "100%",
        paddingTop: 4,
      }}
    >
      <Typography variant="h6">Settings</Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={openConfirmClearDataDialog}>
            <ListItemIcon>
              <DeleteSweepIcon />
            </ListItemIcon>
            <ListItemText primary="Clear data" />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={openConfirmLogoutDialog} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
};

export default SettingsPage;
