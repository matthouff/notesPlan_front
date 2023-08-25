import DefaultBox from "../../components/DefaultBox";
import { useEffect, useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import Groupe from "./components";
import { Box, Button, CircularProgress, Drawer, FormControl, Grid, IconButton, InputLabel, NativeSelect, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import EditGroupe from "./components/EditGroupe";
import PersonnalPopover from "../../components/PersonnalPopover";
import SnackBarPerso from "../../components/SnackbarPerso";
import useResponsive from "../../hooks/useResponsive";
import { ChevronLeft, ChevronRight, MoreVertical, Plus } from "lucide-react";
import EditDialogRepertoire from "../../components/responsive/EditDialogRepertoire";

function Taches() {
  const [repertoireSelected, setRepertoireSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null);
  const [openOption, setOpenOption] = useState();
  const [editGroupeOpen, setEditGroupeOpen] = useState();
  const [responseInfo, setResponse] = useState(null);
  const queryClient = useQueryClient();
  const isTablet = useResponsive("down", "md");

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
      setRepertoireSelected(repertoireSelected ?? data[0].id)
    }
  }, [data, isLoading, repertoireSelected])

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
      persoStyle={{ pr: "5%", display: "flex", flexDirection: "row", gap: 10 }}
      dark
    >
      {!isLoading ?
        <Grid container columnSpacing={5}>
          <Grid item xs={12} md={3}>
            {!isTablet ?
              <RepertoireList
                title="Tâches"
                repertoires={data}
                actualRepertoire={repertoireSelected}
                setRepertoireSelected={setRepertoireSelected}
                createdData={createdData}
                deletedData={mutateDelet}
                editData={editData}
              />
              :
              (!isLoading && data.length > 0) &&
              <Drawer
                anchor={"left"}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
              >
                <Stack width={280} paddingY={5} paddingX={3}>
                  <IconButton onClick={() => setOpenDrawer(false)} sx={{ position: "absolute", top: 20, right: 15 }}>
                    <ChevronLeft />
                  </IconButton>
                  <Typography variant="h1" fontSize={40} color="secondary" mb={2}>Tâches</Typography>
                  <FormControl sx={{ maxWidth: 350 }} variant="outlined" fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Répertoire
                    </InputLabel>
                    <NativeSelect
                      onInput={(e) => setRepertoireSelected(e.target.value)}
                      size="small"
                      defaultValue={data[0]?.id ?? ""}
                      inputProps={{
                        name: 'repertoire',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {data?.map(repertoire => {
                        return (
                          <option key={repertoire.id} value={repertoire.id}>{repertoire.libelle}</option>
                        )
                      })}
                    </NativeSelect>
                  </FormControl>
                  <IconButton
                    onClick={(e) =>
                      setOpenOption({
                        open: true,
                        selected: data.find(x => x.id === repertoireSelected),
                        anchor: e.currentTarget,
                        isRepertoire: true
                      })} size="small" >
                    <MoreVertical color="#fff" width={30} height={30} />
                  </IconButton>
                </Stack>
              </Drawer>
            }
          </Grid>

          <Grid item xs={12} md={9} gridTemplateRows="auto" height="100%" position="relative">
            {isTablet &&
              <IconButton onClick={() => setOpenDrawer(true)} sx={{ position: "absolute", left: "8%", backgroundColor: "#0004", borderRadius: 2 }} color="primary">
                <Plus />
                <ChevronRight />
              </IconButton>
            }
            <Button
              onClick={() => setEditGroupeOpen(true)}
              variant="contained"
              sx={{ position: "absolute", right: 0 }}
            >
              Ajouter un groupe
            </Button>
            <Groupe setResponse={setResponse} repertoireSelected={repertoireSelected} data={groupe} setOpenOption={setOpenOption} />
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

      {
        editGroupeOpen &&
        <EditGroupe groupeSelected={openOption?.selected} onClose={handleClose} handleSubmit={(e, x) => handleSubmit(e, x)} />
      }
      {
        openOption?.open && (
          <PersonnalPopover
            open={openOption?.open}
            anchorEl={openOption?.anchor}
            setOpenOption={setOpenOption}
            selected={openOption?.selected}
            deletedData={deleteGroupe}
            editOpen={openOption?.isRepertoire ? setEditOpen : setEditGroupeOpen}
          />
        )
      }
      {
        editOpen &&
        <EditDialogRepertoire
          repertoireSelected={openOption?.selected}
          handleClose={() => setEditOpen(false)}
          createRep={createdData}
          editRep={editData}
        />
      }
      {
        responseInfo?.open && <SnackBarPerso response={responseInfo} />
      }
    </DefaultBox >
  );
}

export default Taches;
