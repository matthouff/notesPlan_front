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
  // const textFieldRef = useRef(null);
  // const textFieldEditRef = useRef(null);
  // const sendButtonRef = useRef(null);
  // const editRef = useRef(null);

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
      setNoteSelected(notes[0]);
    }
    // if (open) {
    //   textFieldRef.current.focus();
    // }
    // if (editOpen) {
    //   textFieldEditRef.current.focus();
    // }
    // document.addEventListener("click", handleClickOutside);
    // document.addEventListener("click", handleClickOutsideEdit);
    // return () => {
    //   document.removeEventListener("click", handleClickOutside);
    //   document.removeEventListener("click", handleClickOutsideEdit);
    // };
  }, [notes]);

  // const handleClickOutsideEdit = (event) => {
  //   if (
  //     textFieldEditRef?.current &&
  //     !textFieldEditRef?.current?.contains(event.target) &&
  //     sendButtonRef.current &&
  //     !sendButtonRef.current.contains(event.target) &&
  //     !editRef?.current?.contains(event.target)
  //   ) {
  //     setOpenOption(false);
  //     setEditOpen(false);
  //   }
  // };

  console.log(repertoireSelected);
  return (
    <>
      <Stack Stack width="22%">
        <ListNote
          data={notes}
          actualNote={noteSelected}
          noteSelected={(e, x) => setNoteSelected(x)}
          repertoireSelected={repertoireSelected}
          createdData={createdData}
          deletedData={deletedData}
          open={open}
          newNote={setOpen}
        />
      </Stack>
      <Box width="58%" height="100%">
        {notes[0] && <Note note={noteSelected ?? notes[0]} editOpen={open} />}
      </Box>
    </>
  );
}

export default GroupeNotes;
