import {
  Avatar, Card,
  CardActions,
  CardContent,
  CardHeader, Stack,
  Typography
} from "@mui/material";
import DayDataChip from "../components/DayDataChip";
import useStore from "../store";
import theme from "../theme";
import { NavigationTab } from "../types";
import { getMomentFromDayDate, isToday, isYesterday } from "../utils/dateUtil";

const TodayPage = () => {
  const { year, month, day, navigationTab, dataKeys } = useStore();

  if (navigationTab !== NavigationTab.TODAY) {
    return null;
  }

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        paddingTop: 5,
        width: 500,
        margin: "auto",
        gap: 4,
      }}
    >
      <Typography variant="h4">
        {isToday({ year, month, day })
          ? "Today"
          : isYesterday({ year, month, day })
          ? "Yesterday"
          : getMomentFromDayDate({ year, month, day }).format("dddd")}
      </Typography>
      <Card variant="outlined">
        <CardHeader avatar={<Avatar>{day}</Avatar>} />
        <CardContent sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-around',
          gap: 2,
        }}>
          {dataKeys.map((dataKey) => (
            <DayDataChip key={`chip_${dataKey.id}`} dataKey={dataKey} />
          ))}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Stack>
  );
};

export default TodayPage;
