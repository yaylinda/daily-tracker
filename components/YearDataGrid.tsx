import { Box } from "@mui/material";
import React, { useRef } from "react";
import useStore from "../store";
import { DataKey } from "../types";
import { NUM_MONTHS } from "../utils/constants";
import DataKeyCell from "./DataKeyCell";
import MonthDataGrid from "./MonthDataGrid";

export interface YearDataGridProps {
  dataKey: DataKey;
  year: number;
}

const YearDataGrid = ({ dataKey, year }: YearDataGridProps) => {
  const rowRef = useRef<HTMLDivElement>();
  const { leftScroll, setLeftScroll } = useStore();

  React.useEffect(() => {
    if (rowRef && rowRef.current) {
      rowRef.current.scrollLeft = leftScroll;
    }
  }, [leftScroll]);

  const onScroll = () => {
    if (rowRef && rowRef.current) {
      const { scrollLeft } = rowRef.current;
      setLeftScroll(scrollLeft);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <DataKeyCell dataKeyLabel={dataKey.label} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          gap: 2,
        }}
        ref={rowRef}
        onScroll={onScroll}
      >
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
