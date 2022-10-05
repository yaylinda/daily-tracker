import { Box, Typography } from "@mui/material";
import { DataKey } from "../types";
import { DATA_KEY_LABEL_WIDTH, NUM_MONTHS } from "../utils/constants";
import DataKeyCell from "./DataKeyCell";
import MonthDataGrid from "./MonthDataGrid";

export interface YearDataGridProps {
  dataKey: DataKey;
  year: number;
}

const YearDataGrid = ({ dataKey, year }: YearDataGridProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <DataKeyCell dataKeyLabel={dataKey.label} />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {Array.from(Array(NUM_MONTHS)).map((_, i) => (
          <MonthDataGrid
            key={`${dataKey.id}_${year}_${i}`}
            dataKeyId={dataKey.id}
            year={year}
            month={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export default YearDataGrid;
