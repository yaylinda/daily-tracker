import { Avatar, Card, CardHeader } from "@mui/material";
import { FieldValue } from "firebase/firestore";
import moment from "moment";
import { DataKey } from "../types";
import { stringToColor } from "../utils/colorUtil";

const DataKeyItem = ({ dataKey }: { dataKey: DataKey}) => {

  const color = stringToColor(dataKey.id);
  
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexShrink: 0}}>
      <CardHeader 
        avatar={<Avatar sx={{ backgroundColor: color}}>{' '}</Avatar>}
        title={dataKey.label}
        subheader={moment(dataKey.createdAt, 'X').fromNow()}
      />
    </Card>
  )
}

export default DataKeyItem;