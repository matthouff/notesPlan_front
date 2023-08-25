import { Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

EditGroupe.propTypes = {
  groupeSelected: PropTypes.object,
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

function EditGroupe({ onClose, handleSubmit, groupeSelected }) {
  const [groupeLibelle, setGroupeLibelle] = useState(null);
  const [groupeCouleur, setCouleurLibelle] = useState(null);
  const isTablet = useResponsive("down", "md");

  return (
    <Dialog open onClose={onClose}>
      <Stack gap={3} sx={{ p: 2, width: !isTablet ? 450 : "inherit", textAlign: "center" }}>
        <Typography variant="h2" fontSize={25}>
          Ajouter un groupe
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, { libelle: groupeLibelle ?? groupeSelected?.libelle, couleur: groupeCouleur })} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <TextField label="Test" value={!groupeLibelle ? groupeSelected?.libelle : groupeLibelle} variant="outlined" onChange={(e) => setGroupeLibelle(e.target.value)} />
          <input type="color" value={!groupeCouleur ? groupeSelected?.couleur : groupeCouleur} onInput={(e) => setCouleurLibelle(e.target.value)} />
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

export default EditGroupe;