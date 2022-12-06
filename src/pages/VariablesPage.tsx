import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import LifeVariableCard from "../components/LifeVariableCard";
import useStore from "../store";
import theme from "../theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { isEmpty } from "lodash";
import Zoom from '@mui/material/Zoom';

const VariablesPage = () => {
  const { lifeVariables, openAddLifeVariableDialog } = useStore();

  return (
    <Stack
      sx={{
        color: theme.palette.text.primary,
        maxWidth: 800,
        margin: "auto",
        overflow: "hidden",
        height: "100%",
        '&::-webkit-scrollbar': {
          background: 'transparent', 
          display: 'none',
          width: 0,
          height: 0,
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">My Life Variables</Typography>
        <Tooltip title="Add new Life Variable" TransitionComponent={Zoom}>
          <IconButton onClick={openAddLifeVariableDialog}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {isEmpty(lifeVariables) && (
        <Typography
          variant="caption"
          sx={{ textAlign: "center", color: theme.palette.text.secondary }}
        >
          No variables yet.
        </Typography>
      )}
      <Stack sx={{ gap: 2, overflowY: "scroll", marginBottom: 2 }}>
        {lifeVariables.map((lifeVariable) => (
          <LifeVariableCard key={`item_${lifeVariable.id}`} lifeVariable={lifeVariable} />
        ))}
      </Stack>
    </Stack>
  );
};

export default VariablesPage;
