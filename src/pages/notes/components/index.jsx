import { Button, Grid, Stack } from "@mui/material";
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
    queryOption: {
      cacheTime: 0,
    },
  });

  useEffect(() => {
    setNoteSelected(notes[0]);
  }, [repertoireSelected]);

  const { mutate } = useMutation(!open ? editData : createdData, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
      setOpen(false);
    },
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      textFielTitledRef.current.focus();
    } else {
      mutate({
        ...note,
        id: noteSelected?.id ? noteSelected?.id : notes[0]?.id,
      });
    }
    setNoteSelected({ ...noteSelected, ...note });
    setOpen(false); // Fermer le mode édition
  };

  return (
    repertoireSelected && (
      <>
        <Grid item xs={3}>
          {notes.length > 0 ? (
            <ListNote
              data={notes}
              actualNote={noteSelected}
              noteSelected={setNoteSelected}
              createdData={createdData}
              deletedData={deletedData}
              open={open}
              newNote={setOpen}
              addButtonRef={addButtonRef}
              textFieldEditRef={textFieldEditRef}
              textFieldRef={textFieldRef}
            />
          ) : (
            <Stack justifyContent="center" alignItems="center" height="100%">
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                fontSize={20}
              >
                Ajouter une note
              </Button>
            </Stack>
          )}
        </Grid>
        <Grid item xs={6}>
          {(notes[0] || open) && (
            <Note
              editData={editData}
              repertoireSelected={repertoireSelected}
              note={open ? null : noteSelected ?? notes[0]}
              editOpen={open}
              titleRef={textFielTitledRef}
              reactQuillRef={reactQuillRef}
              newNote={newNote}
            />
          )}
        </Grid>

        <SnackBarPerso response={responseInfo} />
      </>
    )
  );
}

export default GroupeNotes;
