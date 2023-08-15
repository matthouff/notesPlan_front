import { Box, Button, Dialog, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Plus, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import useEntityCrud from "../../../hooks/useEntityCrud";
import PopperLabel from "./PopperLabel";

EditTache.propTypes = {
  repertoireSelected: PropTypes.object,
  openTache: PropTypes.object,
  listGroupes: PropTypes.array,
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  deleteTache: PropTypes.func,
};

function EditTache({ onClose, handleSubmit, openTache, listGroupes, deleteTache, repertoireSelected }) {
  const [groupeLibelle, setGroupeLibelle] = useState(null);
  const [description, setDescription] = useState(null);
  const [groupe, setGroupe] = useState(null);
  const [listNewTache, setlListNewTache] = useState(null);
  const [editOpenLabel, setEditOpenLabel] = useState(null);

  const { data, addRelationData, deletedData } = useEntityCrud({
    entity: `labels`,
    complement: `tache`,
    id: openTache?.tache?.id,
    enabled: !!openTache?.tache?.id
  });

  const handleClick = (e) => {
    setEditOpenLabel({ anchorEl: e.currentTarget, open: true });
  };

  let listLabels = listNewTache ?? data;

  const addNewLabel = (x) => {
    if (x.id) {
      addRelationData(x);
    } else {
      setlListNewTache(x);
    }
  }

  console.log(repertoireSelected);

  return (
    <Dialog open onClose={onClose}>
      <Stack gap={3} sx={{ p: 2, width: 600 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingRight={1}>
          <Typography variant="h2" fontSize={25}>
            {openTache?.tache?.id ? "Modifier" : "Ajouter"} une tache
          </Typography>
        </Box>
        <form onSubmit={(e) => handleSubmit(e, { libelle: groupeLibelle ?? openTache?.tache?.libelle, detail: description, groupeId: groupe ?? openTache?.groupe?.id, label: listNewTache })} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Stack flexGrow={1} sx={{ gap: 2 }}>
              <TextField label="Titre" value={!groupeLibelle ? openTache?.tache?.libelle : groupeLibelle} variant="outlined" onChange={(e) => setGroupeLibelle(e.target.value)} required />
              <TextField minRows={10} multiline label="Description" value={description ?? openTache?.tache?.detail ?? undefined} variant="outlined" onChange={(e) => setDescription(e.target.value)} />
              {openTache?.tache?.id &&
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupe ?? openTache.groupe.id}
                  label="Groupe"
                  onChange={(e) => setGroupe(e.target.value)}
                >
                  {
                    listGroupes?.map(groupe => {
                      return (
                        <MenuItem key={groupe.id} value={groupe.id}>{groupe.libelle}</MenuItem>
                      )
                    })
                  }
                </Select>
              }
            </Stack>
            <Stack maxWidth="200px">
              <Typography variant="body2">Labels</Typography>
              <List
                height={400}
              >
                {listLabels?.map(label => {
                  return (
                    <ListItem sx={{ borderLeft: `5px solid ${label.couleur}`, px: 1 }} key={label.id} component="div" secondaryAction={<IconButton onClick={() => deletedData(`${label.id}/tache/${openTache?.tache?.id}`)} sx={{ p: 0 }} ><X /></IconButton>} disablePadding>
                      <ListItemButton sx={{ p: 0 }}>
                        <ListItemText primary={label.libelle} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
              <IconButton onClick={handleClick} sx={{ borderRadius: 0, borderTop: "1px solid #000" }} size="small">
                <Plus />
              </IconButton>
            </Stack>
          </Box>
          <Stack flexDirection="row" gap={2} justifyContent="flex-end">
            <Button color="inherit" variant="contained" onClick={onClose}>
              Annuler
            </Button>
            {openTache?.tache?.id &&
              <Button color="error" onClick={deleteTache} variant="contained">
                Supprimer
              </Button>
            }
            <Button color="success" variant="contained" type="submit">
              {openTache?.tache?.id ? "Modifier" : "Ajouter"}
            </Button>
          </Stack>
        </form>
      </Stack>
      {editOpenLabel?.open &&
        <PopperLabel newTache={!openTache?.tache} repertoireId={repertoireSelected} labelSelected={(x) => addNewLabel(x)} handleClose={() => setEditOpenLabel({ open: false })} />
      }
    </Dialog >
  )
}

export default EditTache;