import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import moment from "moment";
import useStore from "../store";
import { colors } from "../theme";
import { SIDEBAR_WIDTH } from "../utils/constants";
import { getMonthLabels } from "../utils/dateUtil";

const Sidebar = () => {
  const { month, year, setMonth } = useStore();

  const renderMonthItem = (monthLabel: string, monthIndex: number) => {
    return (
      <ListItem key={monthLabel} disablePadding>
        <ListItemButton
          disabled={moment().month() < monthIndex}
          selected={month === monthIndex}
          onClick={() => setMonth(monthIndex)}
        >
          <ListItemIcon>
            {moment().month() === monthIndex && moment().year() === year ? (
              <StarIcon sx={{ color: "yellow" }} />
            ) : (
              <CalendarMonthIcon sx={{ color: colors.TEXT }} />
            )}
          </ListItemIcon>
          <ListItemText primary={monthLabel} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Stack>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">{year}</Typography>
        </Box>
        <Divider />
        <List>
          {getMonthLabels().map((label, index) =>
            renderMonthItem(label, index)
          )}
        </List>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
