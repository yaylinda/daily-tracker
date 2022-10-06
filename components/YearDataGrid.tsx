import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import useScrollStore from "../stores/scrollStore";
import { DataKey } from "../types";
import { NUM_MONTHS } from "../utils/constants";
import DataKeyCell from "./DataKeyCell";
import MonthDataGrid from "./MonthDataGrid";

export interface YearDataGridProps {
  dataKey: DataKey;
  year: number;
}

const YearDataGrid = ({ dataKey, year }: YearDataGridProps) => {
  const rowRef = useRef();
  const { leftScroll: horizontalScroll, setLeftScroll: setHorizontalScroll } =
    useScrollStore();

  useEffect(() => {
    rowRef.current.scrollLeft = horizontalScroll;
  }, [horizontalScroll]);

  const onScroll = () => {
    const { scrollLeft } = rowRef.current;
    setHorizontalScroll(scrollLeft);
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
