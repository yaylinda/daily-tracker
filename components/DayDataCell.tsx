import { Paper } from "@mui/material";

export interface DayDataCellProps {
  content: React.ReactNode;
}

const DayDataCell = ({ content }: DayDataCellProps) => {
  return <Paper>{content}</Paper>;
};

export default DayDataCell;
