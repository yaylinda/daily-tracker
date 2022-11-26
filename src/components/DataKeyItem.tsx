import { Avatar, Card, CardHeader } from "@mui/material";
import { FieldValue } from "firebase/firestore";
import moment from "moment";
import { DataKey, FirestoreServerTimestamp } from "../types";
import { stringToColor } from "../utils/colorUtil";

const DataKeyItem = ({ dataKey }: { dataKey: DataKey}) => {

  const color = stringToColor(dataKey.id);

  const createdAtLabel = () => {
    const {seconds} = dataKey.createdAt as unknown as FirestoreServerTimestamp;
    return moment(seconds, 'X').fromNow();
  }
  
  return (
    <Card variant="outlined">
      <CardHeader 
        avatar={<Avatar sx={{ backgroundColor: color}}>{' '}</Avatar>}
        title={dataKey.label}
        subheader={createdAtLabel()}
      />
    </Card>
  )
}

export default DataKeyItem;