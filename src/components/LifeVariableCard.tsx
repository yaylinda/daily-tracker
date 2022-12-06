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
import { LifeVariable } from "../types";
import { stringToColor } from "../utils/colorUtil";
import YearGrid from "./YearGrid";

const LifeVariableCard = ({ lifeVariable }: { lifeVariable: LifeVariable }) => {
  const { yearDataMap } = useStore();

  const [expanded, setExpanded] = useState(false);

  const color = stringToColor(lifeVariable.id);

  const numDaysSinceCreated =
    moment().diff(moment(lifeVariable.createdAt, "X"), "day") + 1;

  const completedDays = Object.keys(yearDataMap).reduce(
    (prev: Set<string>, curr: string) =>
      new Set([
        ...prev,
        ...(yearDataMap[parseInt(curr)]["true"][lifeVariable.id] || new Set([])),
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
        title={lifeVariable.label}
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
            <YearGrid key={year} year={parseInt(year)} lifeVariable={lifeVariable} />
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

export default LifeVariableCard;
