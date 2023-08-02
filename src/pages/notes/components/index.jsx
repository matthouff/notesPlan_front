import { Box, Stack } from "@mui/material";
import Note from "./Note.jsx";
import ListNote from "./ListNote.jsx";
import { useEffect, useRef, useState } from "react";
import useEntityCrud from "../../../hooks/useEntityCrud.js";
import PropTypes from "prop-types";

GroupeNotes.propTypes = {
  repertoireSelected: PropTypes.string,
};

function GroupeNotes({ repertoireSelected }) {
  const [noteSelected, setNoteSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const textFielTitledRef = useRef(null);
  const textFieldEditRef = useRef(null);
  const textFieldRef = useRef(null);
  const addButtonRef = useRef(null);
  let editRef = useRef(null);


  const {
    data: notes,
    createdData,
    deletedData,
    editData,
  } = useEntityCrud({
    entity: `notes`,
    complement: `repertoire-notes`,
    id: repertoireSelected,
    enabled: !!repertoireSelected, // Permet d'attendre que l'id soit présent pour envoyer la requête
  });

  useEffect(() => {
    if (notes) {
      setNoteSelected(notes[0]);
    }
    if (open) {
      textFielTitledRef?.current?.focus();
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [notes, open]);

  const handleClickOutside = (event) => {
    if (
      textFielTitledRef?.current &&
      !textFielTitledRef?.current?.contains(event.target) &&
      textFieldEditRef?.current &&
      !textFieldEditRef?.current?.contains(event.target) &&
      addButtonRef.current &&
      !addButtonRef.current.contains(event.target) &&
      !editRef?.current?.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  const newNote = (x) => {
    if (x) {
      createdData(x)
    } else {
      //editData(x)
    }
    setNoteSelected({ ...noteSelected, x })
  }

  return (
    <>
      <Stack Stack width="22%">
        <ListNote
          data={notes}
          actualNote={noteSelected}
          noteSelected={setNoteSelected}
          repertoireSelected={repertoireSelected}
          createdData={createdData}
          deletedData={deletedData}
          open={open}
          newNote={setOpen}
          addButtonRef={addButtonRef}
          textFieldEditRef={textFieldEditRef}
          textFieldRef={textFieldRef}
        />
      </Stack>
      <Box width="58%" height="100%">
        {(notes[0] || open) &&
          <Note
            editData={editData}
            repertoireSelected={repertoireSelected}
            note={open ? null : noteSelected ?? notes[0]}
            editOpen={open}
            titleRef={textFielTitledRef}
            newNote={newNote} />
        }
      </Box>
    </>
  );
}

export default GroupeNotes;
