import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import useStore from "../store";
import { DataKey } from "../types";
import { stringToColor } from "../utils/colorUtil";
import YearGrid from "./YearGrid";

const DataKeyItem = ({ dataKey }: { dataKey: DataKey }) => {
  const { yearDataMap } = useStore();

  const [expanded, setExpanded] = useState(false);

  const color = stringToColor(dataKey.id);

  const numDaysSinceCreated =
    moment().diff(moment(dataKey.createdAt, "X"), "day") + 1;

  const completedDays = Object.keys(yearDataMap).reduce(
    (prev: Set<string>, curr: string) =>
      new Set([
        ...prev,
        ...(yearDataMap[parseInt(curr)]["true"][dataKey.id] || new Set([])),
      ]),
    new Set([])
  );

  const completionPercentage = (completedDays.size / numDaysSinceCreated) * 100;

  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexShrink: 0, flexDirection: "column" }}
    >
      <CardHeader
        avatar={<Avatar sx={{ backgroundColor: color }}> </Avatar>}
        title={dataKey.label}
        subheader={`Completed ${
          completedDays.size
        } of ${numDaysSinceCreated} days (${completionPercentage.toFixed(1)}%)`}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {Object.keys(yearDataMap).map((year) => (
            <YearGrid year={parseInt(year)} />
          ))}
        </CardContent>
      </Collapse>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setExpanded(!expanded)}>{`Show ${
          expanded ? "less" : "more"
        }`}</Button>
      </CardActions>
    </Card>
  );
};

export default DataKeyItem;
