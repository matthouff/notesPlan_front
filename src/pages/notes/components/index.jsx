import { Button, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Note from "./Note.jsx";
import ListNote from "./ListNote.jsx";
import { useEffect, useState } from "react";
import useEntityCrud from "../../../hooks/useEntityCrud.js";

GroupeNotes.propTypes = {
  repertoireSelected: PropTypes.string,
};

function GroupeNotes({ repertoireSelected }) {
  const [noteSelected, setNoteSelected] = useState(null)

  const { data: notes } = useEntityCrud({
    entity: `notes/repertoire/${repertoireSelected}`,
    enabled: !!repertoireSelected // Permet d'attendre que l'id soit présent pour envoyer la requête
  })

  useEffect(() => {
    if (notes) {
      selectedNote(notes[0])
    }
  }, [notes])

  const selectedNote = (x) => {
    if (x !== null) {
      setNoteSelected(x);
    }
  }

  return (
    <>
      <Stack Stack width="22%" >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography variant="h6" color="primary">Notes</Typography>
          <Button color="primary" mb={1}>Ajouter +</Button>
        </Stack>
        <ListNote data={notes} actualNote={noteSelected} noteSelected={(e, x) => selectedNote(x)} />
      </Stack >
      <Stack width="58%" height="100%">
        {
          notes[0] && <Note note={noteSelected ?? notes[0]} />
        }
      </Stack>
    </>
  )
}

export default GroupeNotes;