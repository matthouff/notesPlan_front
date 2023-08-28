import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import SnackBarPerso from "../SnackbarPerso";
import "../style.css";


EditDialogRepertoire.propTypes = {
  repertoireSelected: PropTypes.object,
  handleClose: PropTypes.func,
  createRep: PropTypes.func,
  editRep: PropTypes.func,
};

function EditDialogRepertoire({ repertoireSelected, handleClose, createRep, editRep }) {
  const [state, setState] = useState("")
  const [responseInfo, setResponse] = useState(false);

  useEffect(() => {
    if (repertoireSelected) {
      setState(repertoireSelected?.libelle)
    }
  }, [repertoireSelected])

  const { mutate } = useMutation(!repertoireSelected ? createRep : editRep, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
    },
  });

  const newRepertoire = (repertoireLibelle) => {
    if (repertoireSelected) {
      mutate({ ...repertoireSelected, libelle: repertoireLibelle })
    } else {
      mutate({ libelle: repertoireLibelle })
    }
  }

  return (
    <>
      <Dialog open onClose={handleClose}>
        <DialogTitle>
          {repertoireSelected ? "Modifier le répertoire" : "Créer un répertoire"}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={state}
            onChange={(e) => setState(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Libelle"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contain" onClick={handleClose}>Annuler</Button>
          <Button variant="contain" color="secondary" onClick={() => { newRepertoire(state); handleClose(); }}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      {responseInfo?.open && <SnackBarPerso response={responseInfo} />}
    </>
  )
}

export default EditDialogRepertoire;