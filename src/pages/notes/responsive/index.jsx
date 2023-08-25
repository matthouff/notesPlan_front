import { Box, Button, FormControl, IconButton, InputLabel, NativeSelect, Stack, Typography } from "@mui/material";
import Note from "../components/Note";
import PropTypes from "prop-types";
import useEntityCrud from "../../../hooks/useEntityCrud";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import SnackBarPerso from "../../../components/SnackbarPerso";
import DeleteDialog from "../../../components/DeleteDialog";
import "../style.css";
import { MoreVertical, Plus } from "lucide-react";
import PersonnalPopover from "../../../components/PersonnalPopover";
import EditDialogRepertoire from "../../../components/responsive/EditDialogRepertoire";


MobileNote.propTypes = {
  isLoading: PropTypes.bool,
  repertoires: PropTypes.array,
  repertoireSelected: PropTypes.string,
  setRepertoireSelected: PropTypes.func,
  deleteRepertoire: PropTypes.func,
  createRep: PropTypes.func,
  editRep: PropTypes.func,
};

function MobileNote({ isLoading, repertoires, repertoireSelected, setRepertoireSelected, deleteRepertoire, createRep, editRep }) {
  const [noteSelected, setNoteSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const [responseInfo, setResponse] = useState(null);
  const textFielTitledRef = useRef(null);
  const reactQuillRef = useRef(null);

  const {
    data: notes,
    createdData: createNote,
    deletedData: deleteNote,
    editData: editNote,
    isLoading: noteIsLoading,
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
    if (notes.length === 0) {
      setNoteSelected(null)
    }
    if (open) {
      textFielTitledRef?.current?.focus();
    }
  }, [notes, open]);

  const { mutate } = useMutation(!open ? editNote : createNote, {
    onSuccess: (response) => {
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
      setOpen(false)
    },
  });


  const newNote = (x) => {
    if (open) {
      mutate({ ...x, repertoireId: repertoireSelected ?? repertoires[0].id });
      textFielTitledRef.current.focus();
    } else {
      mutate({ ...x, id: noteSelected?.id ? noteSelected?.id : notes[0]?.id });
    }
    setNoteSelected({ ...noteSelected, ...x });
    setOpen(false); // Fermer le mode édition
    if (x.libelle) {
      textFielTitledRef.current.focus(); // Mettre le focus sur le champ de titre après l'ajout/modification
    } else if (x.message) {
      reactQuillRef.current.focus(); // Mettre le focus sur le champ de titre après l'ajout/modification
    }
  };

  const onDelete = () => {
    deleteNote(noteSelected.id);
    setOpenModal(false);
  };

  return (
    !isLoading ?
      <Stack width="100%" gap={2}>
        <Typography variant="h1" fontSize={40} color="primary" textAlign="center">Notes</Typography>
        {(!isLoading && repertoires.length > 0) &&
          <Box display="flex" sx={{ width: "100%", marginX: "auto", justifyContent: "center" }} justifyContent="space-around">
            <FormControl sx={{ maxWidth: 350 }} variant="outlined" fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Répertoire
              </InputLabel>
              <NativeSelect
                onInput={(e) => setRepertoireSelected(e.target.value)}
                size="small"
                defaultValue={repertoires[0]?.id ?? ""}
                inputProps={{
                  name: 'repertoire',
                  id: 'uncontrolled-native',
                }}
              >
                {repertoires?.map(repertoire => {
                  return (
                    <option key={repertoire.id} value={repertoire.id}>{repertoire.libelle}</option>
                  )
                })}
              </NativeSelect>
            </FormControl>
            <IconButton onClick={(e) => setOpenOption({ open: true, selected: repertoires.find(x => x.id === repertoireSelected), anchor: e.currentTarget })} size="small" >
              <MoreVertical color="#fff" width={30} height={30} />
            </IconButton>
          </Box>
        }
        {(!noteIsLoading && notes.length > 0) ?
          <Box display="flex" sx={{ width: "100%", marginX: "auto", justifyContent: "center" }} justifyContent="space-around">
            <FormControl sx={{ maxWidth: 350 }} variant="outlined" fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Liste des notes
              </InputLabel>
              <NativeSelect
                onInput={(e) => { setOpen(false); setNoteSelected(e.target.value); }}
                size="small"
                defaultValue={notes[0].id ?? ""}
                inputProps={{
                  name: 'notes',
                  id: 'uncontrolled-native',
                }}
              >
                {notes?.map(note => {
                  return (
                    <option key={note.id} value={note?.id}>{note.libelle}</option>
                  )
                })}
              </NativeSelect>
            </FormControl>
            <IconButton onClick={() => setOpen(true)} size="small" >
              <Plus color="#fff" width={30} height={30} />
            </IconButton>
          </Box>
          :
          <Button onClick={() => setOpen(true)} sx={{ maxWidth: "350px", marginX: "auto" }} variant="contained">
            Ajouter une note
          </Button>
        }

        {(noteSelected || open) &&
          <Note
            editData={editNote}
            repertoireSelected={repertoireSelected}
            note={open ? null : notes.find(x => x.id === noteSelected) ?? noteSelected}
            editOpen={open}
            titleRef={textFielTitledRef}
            reactQuillRef={reactQuillRef}
            newNote={newNote}
            deleted={setOpenModal}
          />
        }
        {openModal && (
          < DeleteDialog
            open
            selected={noteSelected ?? notes[0]}
            setOpenModal={setOpenModal}
            onDelete={onDelete}
            title="supprimer la note ?"
          />
        )}

        {editOpen &&
          <EditDialogRepertoire
            repertoireSelected={openOption?.selected}
            handleClose={() => setEditOpen(false)}
            createRep={createRep}
            editRep={editRep}
          />
        }

        {openOption && (
          <PersonnalPopover
            open={openOption.open}
            anchorEl={openOption.anchor}
            setOpenOption={setOpenOption}
            selected={openOption.selected}
            editOpen={setEditOpen}
            deletedData={deleteRepertoire}
          />
        )}
        <SnackBarPerso response={responseInfo} />
      </Stack>
      :
      <Typography>load</Typography>
  )
}

export default MobileNote;