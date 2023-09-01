import {
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import { X } from "lucide-react";

EditGroupe.propTypes = {
  groupeSelected: PropTypes.object,
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

function EditGroupe({ onClose, handleSubmit, groupeSelected }) {
  const [groupeLibelle, setGroupeLibelle] = useState("");
  const [groupeCouleur, setCouleurLibelle] = useState("");
  const isTablet = useResponsive("down", "md");

  return (
    <Dialog open onClose={onClose}>
      <Stack
        gap={3}
        sx={{ p: 2, width: !isTablet ? 450 : "inherit", textAlign: "center" }}
      >
        <Typography variant="h2" fontSize={25}>
          Ajouter un groupe
        </Typography>
        <form
          onSubmit={(e) =>
            handleSubmit(e, {
              libelle: groupeLibelle ?? groupeSelected?.libelle,
              couleur: groupeCouleur,
            })
          }
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <TextField
            color="secondary"
            label="Test"
            defaultValue={
              !groupeLibelle ? groupeSelected?.libelle : groupeLibelle
            }
            variant="outlined"
            onInput={(e) => setGroupeLibelle(e.target.value)}
          />
          <Stack direction="row" alignItems="center">
            <input
              type="color"
              value={groupeCouleur ?? groupeSelected?.couleur}
              onInput={(e) => {
                setCouleurLibelle(e.target.value);
                e.preventDefault();
              }}
            />
            <Tooltip title="Effacer la couleur">
              <IconButton onClick={() => setCouleurLibelle("#00000000")}>
                <X />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack flexDirection="row" gap={2} justifyContent="flex-end">
            <Button color="inherit" variant="contained" onClick={onClose}>
              Annuler
            </Button>
            <Button color="success" variant="contained" type="submit">
              {groupeSelected ? "Modifier" : "Ajouter"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  );
}

export default EditGroupe;
