import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DayDataChip from "../components/DayDataChip";
import useStore from "../store";
import theme from "../theme";
import { NavigationTab } from "../types";
import { getMomentFromDayDate, isToday, isYesterday } from "../utils/dateUtil";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TodayPage = () => {
  const { year, month, day, navigationTab, dataKeys } = useStore();

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        width: 500,
        margin: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        {isToday({ year, month, day })
          ? "Today"
          : isYesterday({ year, month, day })
          ? "Yesterday"
          : getMomentFromDayDate({ year, month, day }).format("dddd")}
      </Typography>
      <Box sx={{ display: "flex", marginTop: "auto", marginBottom: "auto" }}>
        <Card variant="outlined">
          <CardHeader
            sx={{ color: theme.palette.text.primary }}
            avatar={
              <Avatar
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  border: `2px ${theme.palette.text.primary} solid`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {day}
                </Typography>
              </Avatar>
            }
            title={getMomentFromDayDate({ year, month, day }).format("MMMM")}
            subheader={getMomentFromDayDate({ year, month, day }).format("YYYY")}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 2,
            }}
          >
            {dataKeys.map((dataKey) => (
              <DayDataChip key={`chip_${dataKey.id}`} dataKey={dataKey} />
            ))}
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </Stack>
  );
};

export default TodayPage;
