import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Tache from "./tache";
import { MoreHorizontal, Plus } from "lucide-react";
import useEntityCrud from "../../../hooks/useEntityCrud";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditTache from "./EditTache";
import DeleteDialog from "../../../components/DeleteDialog";
import PropTypes from "prop-types";

Groupe.propTypes = {
  data: PropTypes.array,
  repertoireSelected: PropTypes.string,
  setOpenOption: PropTypes.func,
  setResponse: PropTypes.func,
};

function Groupe({ data, setOpenOption, repertoireSelected, setResponse }) {
  const [openTache, setOpenTache] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [groupeDropSelected, setGroupeDropSelected] = useState();
  const queryClient = useQueryClient();

  const smallListGroup = data.map(function (groupe) {
    return { id: groupe.id, libelle: groupe.libelle };
  });

  const { createdData, editData, deletedData } = useEntityCrud({
    entity: "taches",
  });

  const { mutate } = useMutation(
    openTache?.tache?.id || groupeDropSelected ? editData : createdData,
    {
      onSuccess: (response) => {
        setResponse({
          ...response.data,
          key: new Date().getTime(),
          open: true,
        });
        // Mettre à jour la liste des taches après la création d'un nouvel élément
        queryClient.invalidateQueries("groupes");
      },
    }
  );

  const handleSubmit = (e, tache) => {
    e.preventDefault();

    if (!openTache?.tache?.id) {
      mutate({ ...tache, groupeId: openTache?.groupe?.id });
    } else {
      mutate({ ...tache, id: openTache?.tache?.id });
    }
    setOpenTache({ open: false });
  };

  const handleClose = () => {
    setOpenTache({ open: false, tache: null, groupe: null });
  };

  const onDelete = () => {
    deletedData(openTache?.tache?.id);
    setOpenTache(null);
    setDeleteOpen(false);
  };

  const drop = (e, groupeIdDroped) => {
    e.preventDefault();

    setGroupeDropSelected(groupeIdDroped);
    const itemData = e.dataTransfer.getData("application/json");
    const parsedData = JSON.parse(itemData);
    mutate({ ...parsedData.tache, groupeId: groupeIdDroped });

    setGroupeDropSelected(null);
  };

  return (
    <Stack
      flexDirection="row"
      gap={3}
      sx={{
        height: "100%",
        overflowX: "auto",
        width: "100%",
        paddingBottom: 5,
        pt: 7,
      }}
    >
      {data &&
        data
          ?.sort((a, b) => new Date(a.createdat) - new Date(b.createdat))
          .map((groupe) => {
            return (
              <Stack
                key={groupe?.id}
                sx={{ maxWidth: "300px", minWidth: "300px" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      width: "80%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    color="primary"
                    fontWeight="bold"
                  >
                    {groupe.libelle}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={(e) =>
                      setOpenOption({
                        open: true,
                        anchor: e.currentTarget,
                        selected: groupe,
                      })
                    }
                    sx={{ padding: 0, width: 25 }}
                  >
                    <MoreHorizontal width={20} />
                  </IconButton>
                </Box>
                <Paper
                  onDrop={(e) => drop(e, groupe?.id)}
                  onDragOver={(e) => e.preventDefault()}
                  elevation={3}
                  style={{
                    height: "100%",
                    padding: 15,
                    maxWidth: "300px",
                    backgroundColor: "#fff4",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Divider
                    sx={{
                      border: `2px solid ${groupe?.couleur}`,
                      width: "100%",
                      position: "absolute",
                      top: 0,
                    }}
                  />
                  <Stack
                    sx={{
                      overflowY: "auto",
                      width: "100%",
                      borderBottom: "1px solid #fff",
                      pb: 1,
                    }}
                    gap={2}
                  >
                    {groupe.taches
                      .sort(
                        (a, b) => new Date(a.createdat) - new Date(b.createdat)
                      )
                      .map((tache) => {
                        return (
                          <Tache
                            key={tache.id}
                            tache={tache}
                            openModal={(tache) =>
                              setOpenTache({
                                groupe: groupe,
                                tache: tache,
                                open: true,
                              })
                            }
                          />
                        );
                      })}
                  </Stack>
                  <IconButton
                    onClick={() => setOpenTache({ groupe: groupe, open: true })}
                    color="primary"
                    sx={{ width: "100%", borderRadius: "0" }}
                  >
                    <Plus />
                  </IconButton>
                </Paper>
              </Stack>
            );
          })}
      {openTache?.open && (
        <EditTache
          repertoireSelected={repertoireSelected}
          listGroupes={smallListGroup}
          openTache={openTache}
          onClose={handleClose}
          handleSubmit={(e, tache) => handleSubmit(e, tache)}
          deleteTache={() => setDeleteOpen(true)}
        />
      )}
      {deleteOpen && (
        <DeleteDialog
          open
          selected={openTache?.tache}
          setOpenModal={setDeleteOpen}
          onDelete={onDelete}
          title="supprimer la note ?"
        />
      )}
    </Stack>
  );
}

export default Groupe;
