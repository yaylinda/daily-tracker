import { Card, CardHeader, Avatar } from "@mui/material";
import moment from "moment";
import { DataKey } from "../types";
import { stringToColor } from "../utils/colorUtil";

const DataKeyStats = ({ dataKey, dates }: { dataKey: DataKey, dates: string[]}) => {

    const color = stringToColor(dataKey.id);
    
    return (
      <Card variant="outlined" sx={{ display: 'flex', flexShrink: 0}}>
        <CardHeader 
          avatar={<Avatar sx={{ backgroundColor: color}}>{' '}</Avatar>}
          title={dataKey.label}
          subheader={moment(dataKey.updatedAt, 'X').fromNow()}
        />
      </Card>
    )
  }
  
  export default DataKeyStats;