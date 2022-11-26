import { Box } from "@mui/material"
import useStore from "../store";
import { NavigationTab } from "../types";

const TodayPage = () => {
  const { navigationTab } = useStore();

  if (navigationTab !== NavigationTab.TODAY) {
    return null;
  }

  return (
      <Box>

      </Box>
  )
}

export default TodayPage;