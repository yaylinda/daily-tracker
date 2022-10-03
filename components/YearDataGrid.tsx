import { Box } from "@mui/material";
import MonthDataGrid from "./MonthDataGrid";

export interface YearDataGridProps {
  year: number;
}

const YearDataGrid = ({ year }: YearDataGridProps) => {
  return <MonthDataGrid year={year} month={0} />;
};

export default YearDataGrid;
