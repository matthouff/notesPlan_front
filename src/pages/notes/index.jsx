import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components";
import { useEffect, useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import SnackBarPerso from "../../components/SnackbarPerso";
import MobileNote from "./responsive";
import useResponsive from "../../hooks/useResponsive";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState(null);
  const isTablet = useResponsive("down", "lg");

  const { data, isLoading, createdData, deletedData, editData, error } = useEntityCrud({
    entity: "repertoires_notes",
  });

  useEffect(() => {
    if (!isLoading) {
      setRepertoireSelected(data[0].id)
    }
  }, [data, isLoading])

  return (
    <DefaultBox
      persoStyle={{ pl: isTablet ? "5%" : 5, pr: isTablet && "5%", display: "flex", flexDirection: "row", gap: 5 }}
      dark
    >
      {
        !isTablet ?
          <Grid container columnSpacing={4}>
            <Grid item xs={3}>
              <RepertoireList
                title={"Notes"}
                repertoires={data}
                actualRepertoire={repertoireSelected}
                setRepertoireSelected={setRepertoireSelected}
                createdData={createdData}
                deletedData={deletedData}
                editData={editData}
              />
            </Grid>
            {!isLoading ?
              <GroupeNotes repertoireSelected={repertoireSelected} />
              :
              <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", gap: 2 }}>
                <Typography color="primary">
                  Loading...
                </Typography>
                <CircularProgress />
              </Box>
            }
          </Grid>

          :
          <MobileNote
            isLoading={isLoading}
            repertoires={data}
            repertoireSelected={repertoireSelected}
            setRepertoireSelected={setRepertoireSelected}
            deleteRepertoire={deletedData}
            createRep={createdData}
            editRep={editData}
          />
      }

      {!!error &&
        <SnackBarPerso error={error} />
      }
    </DefaultBox>
  );
}

export default Notes;
