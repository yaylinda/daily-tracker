import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Stack, Typography } from "@mui/material";
import LoggedOutView from "../components/LoggedOutView";
import MonthLabelRow from "../components/MonthLabelRow";
import YearDataGrid from "../components/YearDataGrid";
import useStore from "../store";
import { colors } from "../theme";

const YearGridLayout = () => {
  const { year, dataKeys, isAuthed, openAddDataKeyDialog } = useStore();

  const addDataKeyButton = (
    <Button
      variant="contained"
      startIcon={<AddCircleIcon />}
      sx={{ marginTop: 5 }}
      onClick={openAddDataKeyDialog}
    >
      Add Life Attribute
    </Button>
  );

  const renderBody = () => {
    if (!isAuthed) {
      return <LoggedOutView />;
    }

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Typography variant="h1">{year}</Typography>
        </Box>
        {renderData()}
      </>
    );
  };

  const renderData = () => {
    if (dataKeys.length) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            color: colors.TEXT,
            gap: 2,
          }}
        >
          <MonthLabelRow />
          <Stack>
            {dataKeys.map((dataKey) => (
              <YearDataGrid
                key={`${year}_${dataKey.id}`}
                year={year}
                dataKey={dataKey}
              />
            ))}
            {addDataKeyButton}
          </Stack>
        </Box>
      );
    }

    return (
      <Stack sx={{ width: 400, alignSelf: "center" }}>
        <Typography
          variant="caption"
          color={colors.LIGHTER_TEXT}
          sx={{ marginBottom: 1 }}
        >
          Add a new Life Attribute to track daily that can be expressed as a
          boolean (a "true" or "false" value).
        </Typography>
        <Typography variant="caption" color={colors.LIGHTER_TEXT}>
          This can be something like "Felt Happy", or "Exercised", or even "Got
          out of bed".
        </Typography>
        {addDataKeyButton}
      </Stack>
    );
  };

  return (
    <Stack
      sx={{
        color: colors.TEXT,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      {renderBody()}
    </Stack>
  );
};

export default YearGridLayout;
