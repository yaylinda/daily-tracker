import {
  Box,
  Grid,
  LinearProgress,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import AddDataKeyGridItem from "../components/AddDataKeyGridItem";
import LabelledMonthDataGrid from "../components/LabelledMonthDataGrid";
import DayDataDialog from "../dialogs/DayDataDialog";
import useStore from "../store";
import { DAY_WIDTH, SIDEBAR_WIDTH } from "../utils/constants";

const MainPanel = () => {
  const { loading, month, year, dataKeys } = useStore();

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          flexGrow: 1,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h2"
                sx={{ marginRight: 4, fontWeight: "bold" }}
              >
                {moment().month(month).format("MMMM")}
              </Typography>
              <Typography variant="h2">{year}</Typography>
            </Box>
          </Box>

          {loading ? (
            <LinearProgress />
          ) : (
            <Grid
              container
              rowSpacing={0}
              columnSpacing={`${DAY_WIDTH * 2}px`}
              sx={{
                marginLeft: `-${DAY_WIDTH}px`,
                marginTop: `-${DAY_WIDTH}px`,
              }}
            >
              {dataKeys.map((dataKey) => (
                <Grid key={`${dataKey.id}_${year}_${month}`} item>
                  <LabelledMonthDataGrid dataKey={dataKey} />
                </Grid>
              ))}
              <Grid
                item
                sx={{
                  paddingLeft: `${DAY_WIDTH}px!important`,
                  paddingTop: `${DAY_WIDTH}px`,
                }}
              >
                <AddDataKeyGridItem />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <DayDataDialog />
    </>
  );
};

export default MainPanel;
