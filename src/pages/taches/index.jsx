import DefaultBox from "../../components/DefaultBox";
import { useEffect, useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import Groupe from "./components";
import { Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import EditGroupe from "./components/EditGroupe";
import PersonnalPopover from "../../components/PersonnalPopover";
import SnackBarPerso from "../../components/SnackbarPerso";

function Taches() {
  const [repertoireSelected, setRepertoireSelected] = useState(null);
  const [openOption, setOpenOption] = useState();
  const [editGroupeOpen, setEditGroupeOpen] = useState();
  const [responseInfo, setResponse] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, createdData, deletedData, editData } = useEntityCrud({
    entity: "repertoires_groupes",
  });

  const { data: groupe, createdData: createGroupe, editData: editGroupe, deletedData: deleteGroupe } = useEntityCrud({
    entity: "groupes",
    complement: "repertoire_groupe",
    id: repertoireSelected,
    enabled: !!repertoireSelected
  });

  useEffect(() => {
    if (!isLoading) {
      setRepertoireSelected(data[0].id)
    }
  }, [data, isLoading])

  const { mutate } = useMutation(openOption?.selected?.id ? editGroupe : createGroupe, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
      // Mettre à jour la liste des groupes après la création d'un nouvel élément
      queryClient.invalidateQueries("groupes");
    },
  });
  const { mutate: mutateDelet } = useMutation(deletedData, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
    },
  });

  const handleSubmit = (e, x) => {
    e.preventDefault();


    if (!openOption?.selected?.id) {
      const newGroupe = { ...x, repertoireId: repertoireSelected }
      mutate(newGroupe);
    } else {
      mutate({ id: openOption?.selected.id, ...x });
    }
    setOpenOption(null)
    setEditGroupeOpen(false);
  }

  const handleClose = () => {
    setEditGroupeOpen(false)
    setOpenOption(null)
  }

  return (
    <DefaultBox
      persoStyle={{ display: "flex", flexDirection: "row", gap: 10, paddingBottom: 10 }}
      dark
    >
      {!isLoading ?
        <Grid container>
          <Grid item xs={4}>
            <RepertoireList
              title="Tâches"
              repertoires={data}
              actualRepertoire={repertoireSelected}
              setRepertoireSelected={setRepertoireSelected}
              createdData={createdData}
              deletedData={mutateDelet}
              editData={editData}
            />
          </Grid>

          <Grid item={8}>
            <Stack paddingTop={2} alignItems="flex-end" gap={3} sx={{ pr: 5 }}>
              <Button
                onClick={() => setEditGroupeOpen(true)}
                variant="contained"
              >
                Ajouter un groupe
              </Button>
              <Groupe setResponse={setResponse} repertoireSelected={repertoireSelected} data={groupe} setOpenOption={setOpenOption} />
            </Stack>
          </Grid>
        </Grid>
        :
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", gap: 2 }}>
          <Typography color="primary">
            Loading...
          </Typography>
          <CircularProgress />
        </Box>
      }

      {editGroupeOpen &&
        <EditGroupe groupeSelected={openOption?.selected} onClose={handleClose} handleSubmit={(e, x) => handleSubmit(e, x)} />
      }
      {openOption?.open && (
        <PersonnalPopover
          open={openOption?.open}
          anchorEl={openOption?.anchor}
          setOpenOption={setOpenOption}
          selected={openOption?.selected}
          deletedData={deleteGroupe}
          editOpen={setEditGroupeOpen}
        />
      )}

      {
        responseInfo?.open && <SnackBarPerso response={responseInfo} />
      }
    </DefaultBox >
  );
}

export default Taches;
