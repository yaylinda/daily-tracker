import LoginIcon from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import ConfirmLogOutDialog from "../dialogs/ConfirmLogOutDialog";
import useStore from "../store";
import { colors } from "../theme";
import { stringToColor } from "../utils/colorUtil";

/**
 *
 * @param name
 * @returns
 */
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const UserAvatar = () => {
  const { idToken, accessToken, user, isAnon, signOut, openLoginDialog } =
    useStore();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showConfirmSignOutDialog, setShowConfirmSignOutDialog] =
    React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!idToken && !accessToken && !user) {
    return null;
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar {...stringAvatar(user!.displayName || user!.email || "? ?")} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>{user!.displayName || "Anonymous User"}</MenuItem>
        <Divider />
        {isAnon && (
          <MenuItem onClick={openLoginDialog}>
            <ListItemIcon sx={{ color: colors.TEXT }}>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Link Account
          </MenuItem>
        )}
        <MenuItem onClick={() => setShowConfirmSignOutDialog(true)}>
          <ListItemIcon sx={{ color: colors.TEXT }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <ConfirmLogOutDialog
        open={showConfirmSignOutDialog}
        onClose={() => setShowConfirmSignOutDialog(false)}
      />
    </>
  );
};

export default UserAvatar;
