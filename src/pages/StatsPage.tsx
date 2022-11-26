import { Box } from "@mui/material"
import useStore from "../store";
import { NavigationTab } from "../types";

const StatsPage = () => {
  const { navigationTab } = useStore();
  
  if (navigationTab !== NavigationTab.VARIABLES) {
    return null;
  }
  
  return (
    <Box>

    </Box>
  )
}

export default StatsPage;