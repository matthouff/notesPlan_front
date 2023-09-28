import DefaultBox from "../../components/DefaultBox";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import Groupe from "./components";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  NativeSelect,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import EditGroupe from "./components/EditGroupe";
import PersonnalPopover from "../../components/PersonnalPopover";
import SnackBarPerso from "../../components/SnackbarPerso";
import useResponsive from "../../hooks/useResponsive";
import { ChevronLeft, ChevronRight, MoreVertical, Plus } from "lucide-react";
import EditDialogRepertoire from "../../components/responsive/EditDialogRepertoire";

function Taches() {
  const [repertoireSelectedId, setRepertoireSelectedId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null);
  const [openOption, setOpenOption] = useState();
  const [editGroupeOpen, setEditGroupeOpen] = useState(null);
  const [responseInfo, setResponse] = useState(null);
  const queryClient = useQueryClient();
  const isTablet = useResponsive("down", "md");

  const { data, isLoading, createdData, deletedData, editData } = useEntityCrud(
    {
      entity: "repertoires_groupes",
      queryOption: {
        cacheTime: 0,
      },
    }
  );

  const repertoireSelected = repertoireSelectedId
    ? data?.find((repertoire) => repertoire.id === repertoireSelectedId)?.id
    : data[0]?.id;

  const {
    data: groupe,
    createdData: createGroupe,
    editData: editGroupe,
    deletedData: deleteGroupe,
  } = useEntityCrud({
    entity: "groupes",
    complement: "repertoire_groupe",
    id: repertoireSelected,
    enabled: !!repertoireSelected,
  });


  const { mutate } = useMutation(
    openOption?.selected?.id ? editGroupe : createGroupe,
    {
      onSuccess: (response) => {
        setResponse({
          ...response.data,
          key: new Date().getTime(),
          open: true,
        });
        // Mettre à jour la liste des groupes après la création d'un nouvel élément
        queryClient.invalidateQueries("groupes");
      },
    }
  );
  const { mutate: mutateDelete } = useMutation(deletedData, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
      setRepertoireSelectedId(null)
    },
  });

  const handleSubmit = (e, groupe) => {
    e.preventDefault();

    if (!openOption?.selected?.id) {
      const newGroupe = { ...groupe, repertoireId: repertoireSelected };
      mutate(newGroupe);
    } else {
      mutate({ id: openOption?.selected.id, ...groupe });
    }
    setOpenOption(null);
    setEditGroupeOpen(false);
  };

  const handleClose = () => {
    setEditGroupeOpen(false);
    setOpenOption(null);
  };


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
        px: isTablet ? "5%" : 10,
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
      dark
    >
      <Grid container columnSpacing={5}>
        <Grid item xs={12} md={3}>
          {!isTablet ? (
            <RepertoireList
              title="Tâches"
              repertoires={data}
              actualRepertoire={repertoireSelected}
              setRepertoireSelected={setRepertoireSelectedId}
              createdData={createdData}
              deletedData={mutateDelete}
              editData={editData}
            />
          ) : (
            !isLoading &&
            data?.length > 0 &&
            openDrawer && (
              <Drawer
                anchor={"left"}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              >
                <Stack width={280} paddingY={5} paddingX={3}>
                  <IconButton
                    onClick={() => setOpenDrawer(false)}
                    sx={{ position: "absolute", top: 20, right: 15 }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <Typography
                    variant="h1"
                    fontSize={40}
                    color="secondary"
                    mb={2}
                  >
                    Tâches
                  </Typography>
                  <FormControl
                    sx={{
                      maxWidth: 350,
                      display: "flex",
                      flexDirection: "row",
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel
                      color="secondary"
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Répertoire
                    </InputLabel>
                    <NativeSelect
                      fullWidth
                      onInput={(e) => setRepertoireSelectedId(e.target.value)}
                      size="small"
                      color="secondary"
                      defaultValue={data[0]?.id ?? ""}
                      inputProps={{
                        name: "repertoire",
                        id: "uncontrolled-native",
                      }}
                    >
                      {data?.map((repertoire) => {
                        return (
                          <option key={repertoire.id} value={repertoire.id}>
                            {repertoire.libelle}
                          </option>
                        );
                      })}
                    </NativeSelect>
                    <IconButton
                      onClick={(e) =>
                        setOpenOption({
                          open: true,
                          selected: data.find(
                            (x) => x.id === repertoireSelected
                          ),
                          anchor: e.currentTarget,
                          isRepertoire: true,
                        })
                      }
                      size="small"
                    >
                      <MoreVertical color="#000" width={30} height={30} />
                    </IconButton>
                  </FormControl>
                </Stack>
              </Drawer>
            )
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          gridTemplateRows="auto"
          height="100%"
          position="relative"
        >
          {isTablet && (
            <IconButton
              onClick={() => setOpenDrawer(true)}
              sx={{
                position: "absolute",
                left: "8%",
                backgroundColor: "#0004",
                borderRadius: 2,
              }}
              color="primary"
            >
              <Plus />
              <ChevronRight />
            </IconButton>
          )}
          {data.length > 0 && (
            <>
              <Button
                onClick={() => setEditGroupeOpen(true)}
                variant="contained"
                sx={{ position: "absolute", right: 0 }}
              >
                Ajouter un groupe
              </Button>
              <Groupe
                setResponse={setResponse}
                repertoireSelected={repertoireSelected}
                data={groupe}
                setOpenOption={setOpenOption}
              />
            </>
          )}
        </Grid>
      </Grid>

      {editGroupeOpen && (
        <EditGroupe
          groupeSelected={openOption?.selected}
          onClose={handleClose}
          handleSubmit={(e, groupe) => handleSubmit(e, groupe)}
        />
      )}
      {openOption?.open && (
        <PersonnalPopover
          open={openOption?.open}
          anchorEl={openOption?.anchor}
          setOpenOption={setOpenOption}
          selected={openOption?.selected}
          deletedData={deleteGroupe}
          editOpen={openOption?.isRepertoire ? setEditOpen : setEditGroupeOpen}
        />
      )}
      {editOpen && (
        <EditDialogRepertoire
          repertoireSelected={openOption?.selected}
          handleClose={() => setEditOpen(false)}
          createRep={createdData}
          editRep={editData}
        />
      )}
      {responseInfo?.open && <SnackBarPerso response={responseInfo} />}
    </DefaultBox>
  );
}

export default Taches;
