import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import SnackBarPerso from "../../components/SnackbarPerso";
import MobileNote from "./responsive";
import useResponsive from "../../hooks/useResponsive";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useMutation } from "react-query";

function Notes() {
  const [repertoireSelectedId, setRepertoireSelectedId] = useState(null);
  const isTablet = useResponsive("down", "lg");
  const [responseInfo, setResponse] = useState(null);

  const { data, isLoading, createdData, deletedData, editData } =
    useEntityCrud({
      entity: "repertoires_notes",
      queryOption: {
        cacheTime: 0,
      },
    });

  const { mutate: mutateDelete } = useMutation(deletedData, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
      setRepertoireSelectedId(null)
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
              deletedData={mutateDelete}
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
      {responseInfo?.open && <SnackBarPerso response={responseInfo} />}
    </DefaultBox>
  );
}

export default Notes;
