import { Grid } from "@mui/material";
import Note from "./Note.jsx";
import ListNote from "./ListNote.jsx";
import { useEffect, useRef, useState } from "react";
import useEntityCrud from "../../../hooks/useEntityCrud.js";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import SnackBarPerso from "../../../components/SnackbarPerso.jsx";

GroupeNotes.propTypes = {
  repertoireSelected: PropTypes.string,
};

function GroupeNotes({ repertoireSelected }) {
  const [noteSelected, setNoteSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [responseInfo, setResponse] = useState(null);
  const textFielTitledRef = useRef(null);
  const reactQuillRef = useRef(null);
  const textFieldEditRef = useRef(null);
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
    queryOption: {
      cacheTime: 0,
    },
  });

  // Envoyer les requêtes d'ajout / edit avec la response si success
  const { mutate } = useMutation(!open ? editData : createdData, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
      setOpen(false);
    },
  });

  const actualNote = noteSelected
    ? notes?.find((note) => note?.id === noteSelected.id)
    : notes[0];

  // Faire un focus sur le champ libelle de la note lors d'un ajout
  useEffect(() => {
    open && textFielTitledRef.current.focus();
  }, [open]);

  // Permet d'appeler handleClickOutside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Fermer l'edition lorsque l'on clique ailleurs que les éléments compris dans le if
  const handleClickOutside = (event) => {
    if (
      reactQuillRef?.current &&
      !reactQuillRef?.current?.contains(event.target) &&
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

  const newNote = (note) => {
    if (open) {
      mutate({ ...note, repertoireId: repertoireSelected });
    } else {
      mutate({
        ...note,
        id: actualNote?.id ? actualNote?.id : notes[0]?.id,
      });
    }
    setNoteSelected({ ...actualNote, ...note });
    setOpen(false); // Fermer le mode édition
  };

  const onDelete = (noteId) => {
    if (noteId) {
      return deletedData(noteId)
    } else {
      deletedData(notes[0]?.id)
    }
    setNoteSelected(null)
  }

  return (
    repertoireSelected && (
      <>
        <Grid item xs={3}>
          <ListNote
            data={notes}
            actualNote={actualNote}
            noteSelected={setNoteSelected}
            open={open}
            newNote={setOpen}
            addButtonRef={addButtonRef}
            textFieldEditRef={textFieldEditRef}
          />
        </Grid>
        <Grid item xs={6}>
          {(notes[0] || open) && (
            <Note
              note={open ? null : actualNote ?? notes[0]}
              editOpen={open}
              titleRef={textFielTitledRef}
              reactQuillRef={reactQuillRef}
              newNote={newNote}
              deletedData={onDelete}
            />
          )}
        </Grid>

        <SnackBarPerso response={responseInfo} />
      </>
    )
  );
}

export default GroupeNotes;
