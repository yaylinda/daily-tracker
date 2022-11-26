import { Box } from "@mui/material"
import useStore from "../store";
import { NavigationTab } from "../types";

const VariablesPage = () => {
  const { navigationTab } = useStore();
  
  if (navigationTab !== NavigationTab.VARIABLES) {
    return null;
  }

  return (
    <Box>

    </Box>
  )
}

export default VariablesPage;