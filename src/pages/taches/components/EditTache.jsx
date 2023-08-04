import { Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

EditTache.propTypes = {
  tacheSelected: PropTypes.object,
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

function EditTache({ onClose, handleSubmit, tacheSelected }) {
  const [groupeLibelle, setGroupeLibelle] = useState(null);
  const [description, setDescription] = useState(null);

  console.log(tacheSelected);

  return (
    <Dialog open onClose={onClose}>
      <Stack gap={3} sx={{ p: 2, width: 450, textAlign: "center" }}>
        <Typography variant="h2" fontSize={25}>
          Ajouter une tache
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, { libelle: groupeLibelle ?? tacheSelected?.libelle, detail: description })} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField label="Test" value={!groupeLibelle ? tacheSelected?.libelle : groupeLibelle} variant="outlined" onChange={(e) => setGroupeLibelle(e.target.value)} />
          <TextField multiline label="Description" value={!description ? tacheSelected?.detail : description} variant="outlined" onChange={(e) => setDescription(e.target.value)} />
          <Stack flexDirection="row" gap={2} justifyContent="flex-end">
            <Button color="inherit" variant="contained" onClick={onClose}>
              Annuler
            </Button>
            <Button color="success" variant="contained" type="submit">
              Ajouter
            </Button>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  )
}

export default EditTache;