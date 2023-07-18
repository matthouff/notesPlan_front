import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";
import Note from "./Note.jsx";
import ListNote from "./ListNote.jsx";
import { useEffect, useState } from "react";
import useEntityCrud from "../../../hooks/useEntityCrud.js";

GroupeNotes.propTypes = {
  repertoireSelected: PropTypes.string,
};

function GroupeNotes({ repertoireSelected }) {
  const [noteSelected, setNoteSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    data: notes,
    createdData,
    deletedData,
  } = useEntityCrud({
    entity: `notes`,
    complement: `repertoire-notes`,
    id: repertoireSelected,
    enabled: !!repertoireSelected, // Permet d'attendre que l'id soit présent pour envoyer la requête
  });

  useEffect(() => {
    if (notes) {
      selectedNote(notes[0]);
    }
  }, [notes]);

  const selectedNote = (x) => {
    if (x !== null) {
      setNoteSelected(x);
    }
  };

  console.log(notes);
  return (
    <>
      <Stack Stack width="22%">
        <ListNote
          data={notes}
          actualNote={noteSelected}
          noteSelected={(e, x) => selectedNote(x)}
          repertoireSelected={repertoireSelected}
          createdData={createdData}
          deletedData={deletedData}
          open={open}
          newNote={setOpen}
        />
      </Stack>
      <Box width="58%" height="100%">
        {notes[0] && <Note note={noteSelected ?? notes[0]} />}
      </Box>
    </>
  );
}

export default GroupeNotes;
