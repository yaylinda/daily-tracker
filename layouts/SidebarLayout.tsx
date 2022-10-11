import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import LabelledMonthDataGrid from "../components/LabelledMonthDataGrid";
import useStore from "../store";
import { colors } from "../theme";
import { getMonthLabels } from "../utils/monthGridUtil";

const drawerWidth = 240;

const SidebarLayout = () => {
  const { loading, month, year, dataKeys, openAddDataKeyDialog, setMonth } =
    useStore();
  const theme = useTheme();
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
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
            {getMonthLabels().map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={month === index}
                  onClick={() => setMonth(index)}
                >
                  <ListItemIcon>
                    <CalendarMonthIcon sx={{ color: colors.TEXT }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Drawer>
      <Box
        sx={{
          marginLeft: `${drawerWidth}px`,
          flexGrow: 1,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" sx={{ marginBottom: 5 }}>
            {moment().month(month).format("MMMM")} {year}
          </Typography>
          {loading ? (
            <LinearProgress />
          ) : (
            <Grid container spacing={2}>
              {dataKeys.map((dataKey) => (
                <Grid key={`${dataKey.id}_${year}_${month}`} item>
                  <LabelledMonthDataGrid dataKey={dataKey} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
