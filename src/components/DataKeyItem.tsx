import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import { FieldValue } from "firebase/firestore";
import moment from "moment";
import { DataKey } from "../types";
import { stringToColor } from "../utils/colorUtil";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const DataKeyItem = ({ dataKey }: { dataKey: DataKey }) => {
  const [expanded, setExpanded] = useState(false);

  const color = stringToColor(dataKey.id);

  return (
    <Card variant="outlined" sx={{ display: "flex", flexShrink: 0, flexDirection: 'column' }}>
      <CardHeader
        avatar={<Avatar sx={{ backgroundColor: color }}> </Avatar>}
        title={dataKey.label}
        subheader={moment(dataKey.createdAt, "X").fromNow()}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
      <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
        <Button onClick={() => setExpanded(!expanded)}>{`Show ${expanded ? 'less' : 'more'}`}</Button>
      </CardActions>
    </Card>
  );
};

export default DataKeyItem;
