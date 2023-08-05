import { Box, Button, Dialog, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

EditTache.propTypes = {
  openTache: PropTypes.object,
  listGroupes: PropTypes.array,
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  deleteTache: PropTypes.func,
};

function EditTache({ onClose, handleSubmit, openTache, listGroupes, deleteTache }) {
  const [groupeLibelle, setGroupeLibelle] = useState(null);
  const [description, setDescription] = useState(null);
  const [groupe, setGroupe] = useState(null);

  return (
    <Dialog open onClose={onClose}>
      <Stack gap={3} sx={{ p: 2, width: 450 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingRight={1}>
          <Typography variant="h2" fontSize={25}>
            {openTache?.tache?.id ? "Modifier" : "Ajouter"} une tache
          </Typography>
          {openTache?.tache?.id &&
            <IconButton color="error" onClick={deleteTache}>
              <Trash width={20} height={20} />
            </IconButton>
          }
        </Box>
        <form onSubmit={(e) => handleSubmit(e, { libelle: groupeLibelle ?? openTache?.tache?.libelle, detail: description, groupeId: groupe })} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField label="Titre" value={!groupeLibelle ? openTache?.tache?.libelle : groupeLibelle} variant="outlined" onChange={(e) => setGroupeLibelle(e.target.value)} />
          <TextField minRows={10} multiline label="Description" value={!description ? openTache?.tache?.detail : description} variant="outlined" onChange={(e) => setDescription(e.target.value)} />
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
          <Stack flexDirection="row" gap={2} justifyContent="flex-end">
            <Button color="inherit" variant="contained" onClick={onClose}>
              Annuler
            </Button>
            <Button color="success" variant="contained" type="submit">
              {openTache?.tache?.id ? "Modifier" : "Ajouter"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  )
}

export default EditTache;