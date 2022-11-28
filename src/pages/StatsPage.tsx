import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useMemo, useState } from "react";
import DataKeyStats from "../components/DataKeyStats";
import useStore from "../store";
import theme from "../theme";

enum StatsTabs {
  COMPLETION_RATE = "Completion",
  GRID = "Grid",
}

const StatsPage = () => {
  const { year, dataKeys, yearDataMap } = useStore();

  const [selectedTab, setSelectedTab] = useState<StatsTabs>(
    StatsTabs.COMPLETION_RATE
  );
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const yearOptions = Object.keys(yearDataMap);

  const data = useMemo(
    () => yearDataMap[selectedYear]?.["true"] || {},
    [selectedYear, yearDataMap]
  );

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        maxWidth: 500,
        margin: "auto",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Statistics</Typography>
        <FormControl size="small">
          <InputLabel id="year-selection-label">Year</InputLabel>
          <Select
            labelId="year-selection-label"
            id="year-selection"
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value as number)}
          >
            {yearOptions.map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {isEmpty(data) ? (
        <Typography
          variant="caption"
          sx={{ textAlign: "center", color: theme.palette.text.secondary }}
        >
          No data yet.
        </Typography>
      ) : (
        <Stack sx={{ gap: 2, overflowY: "scroll", marginBottom: 2 }}>
          {dataKeys.map(
            (dataKey) =>
              data[dataKey.id] && (
                <DataKeyStats
                  key={`stat_${dataKey.id}`}
                  dataKey={dataKey}
                  dates={data[dataKey.id] ? Array.from(data[dataKey.id]) : []}
                />
              )
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default StatsPage;
