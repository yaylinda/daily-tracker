import { Box, Typography } from "@mui/material";
import React from "react";
import { DATA_KEY_LABEL_WIDTH } from "../utils/constants";

interface DataKeyCellProps {
  dataKeyLabel: string;
}

const DataKeyCell = ({ dataKeyLabel }: DataKeyCellProps) => {
  return (
    <Box
      sx={{
        minWidth: DATA_KEY_LABEL_WIDTH,
        marginRight: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{dataKeyLabel}</Typography>
    </Box>
  );
};

export default DataKeyCell;
