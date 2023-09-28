import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import SnackBarPerso from "../../components/SnackbarPerso";
import MobileNote from "./responsive";
import useResponsive from "../../hooks/useResponsive";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

function Notes() {
  const [repertoireSelectedId, setRepertoireSelectedId] = useState(null);
  const isTablet = useResponsive("down", "lg");

  const { data, isLoading, createdData, deletedData, editData, error } =
    useEntityCrud({
      entity: "repertoires_notes",
      queryOption: {
        cacheTime: 0,
      },
    });

  const repertoireSelected = repertoireSelectedId
    ? data?.find((repertoire) => repertoire.id === repertoireSelectedId)?.id
    : data[0]?.id;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          gap: 2,
        }}
      >
        <Typography color="primary">Loading...</Typography>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <DefaultBox
      persoStyle={{
        pl: isTablet ? "5%" : 5,
        pr: isTablet && "5%",
        display: "flex",
        flexDirection: "row",
        gap: 5,
      }}
      dark
    >
      {!isTablet ? (
        <Grid container columnSpacing={4}>
          <Grid item xs={3}>
            <RepertoireList
              title={"Notes"}
              repertoires={data}
              actualRepertoire={repertoireSelected ?? data[0]?.id}
              setRepertoireSelected={setRepertoireSelectedId}
              createdData={createdData}
              deletedData={deletedData}
              editData={editData}
            />
          </Grid>
          <GroupeNotes repertoireSelected={repertoireSelected} />
        </Grid>
      ) : (
        <MobileNote
          isLoading={isLoading}
          repertoires={data}
          repertoireSelected={repertoireSelected}
          setRepertoireSelected={setRepertoireSelectedId}
          deleteRepertoire={deletedData}
          createRep={createdData}
          editRep={editData}
        />
      )}
      {!!error && <SnackBarPerso error={error} />}
    </DefaultBox>
  );
}

export default Notes;
