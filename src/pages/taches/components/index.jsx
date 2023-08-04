import { Box, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import Tache from "./tache";
import PropTypes from "prop-types";
import { MoreHorizontal, Plus } from "lucide-react";
import useEntityCrud from "../../../hooks/useEntityCrud";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditTache from "./EditTache";

Groupe.propTypes = {
  data: PropTypes.array,
  setOpenOption: PropTypes.func,
};

function Groupe({ data, setOpenOption }) {
  const [groupeSelected, setGroupeSelected] = useState()
  const [tacheSelected, setTacheSelected] = useState()
  const [editTacheOpen, setEditTacheOpen] = useState()
  const queryClient = useQueryClient();

  const { createdData, editData } = useEntityCrud({
    entity: "taches",
    complement: "groupes",
    id: groupeSelected,
    enabled: !!groupeSelected
  });

  const { mutate } = useMutation(tacheSelected?.id ? editData : createdData, {
    onSuccess: () => {
      // Mettre à jour la liste des taches après la création d'un nouvel élément
      queryClient.invalidateQueries("groupes");
    },
  });

  const handleSubmit = (e, x) => {
    e.preventDefault();

    if (editTacheOpen) {
      if (!tacheSelected?.id) {
        mutate({ ...x, groupeId: groupeSelected });
      } else {
        mutate({ ...x, id: tacheSelected.id });
      }
    }

    setEditTacheOpen(false)
  }

  const handleClose = () => {
    setTacheSelected(null)
    setEditTacheOpen(null)
  }

  const handleOpenTache = (x) => {
    console.log(x.tache);
    setEditTacheOpen(true)
    setTacheSelected(x.tache)
    setGroupeSelected(x.groupe.id)
  }

  return (
    <Stack flexDirection="row" gap={3} sx={{ overflowX: "scroll", boxSizing: "border-box", width: "100%", height: "100%", paddingBottom: 3 }}>
      {data && data?.sort((a, b) => new Date(a.createdat) - new Date(b.createdat)).map(groupe => {
        return (
          <Stack
            key={groupe?.id}
            sx={{ maxWidth: "300px", minWidth: "300px", height: "100%" }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography
                sx={{
                  width: "80%",
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
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
              elevation={3}
              style={{ padding: 15, maxWidth: "300px", height: "100%", backgroundColor: "#fff4", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }}
            >
              <Divider sx={{ border: `2px solid ${groupe?.couleur}`, width: "100%", position: "absolute", top: 0 }} />
              <Stack sx={{ overflowY: "auto", width: "100%", borderBottom: "1px solid #fff", pb: 1 }} gap={2}>
                {
                  groupe.taches.sort((a, b) => new Date(a.createdat) - new Date(b.createdat)).map(tache => {
                    return (
                      <Tache key={tache.id} tache={tache} openModal={() => handleOpenTache({ groupe: groupe, tache: tache })} />
                    )
                  })
                }
              </Stack>
              <IconButton
                onClick={() => handleOpenTache(groupe)}
                color="primary"
                sx={{ width: "100%", borderRadius: "0" }}
              >
                <Plus />
              </IconButton>
            </Paper>
          </Stack >
        )
      })}
      {editTacheOpen &&
        <EditTache tacheSelected={tacheSelected} onClose={handleClose} handleSubmit={(e, x) => handleSubmit(e, x)} />
      }
    </Stack >
  );
}

export default Groupe;