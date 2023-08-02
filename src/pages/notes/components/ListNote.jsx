import {
  Box,
  Button,
  IconButton,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import PersonnalToggle from "../../../components/PersoToggle.jsx";
import { Trash } from "lucide-react";
import { useState } from "react";
import DeleteDialog from "../../../components/DeleteDialog.jsx";

ListNote.propTypes = {
  data: PropTypes.array,
  repertoireSelected: PropTypes.string,
  actualNote: PropTypes.object,
  addButtonRef: PropTypes.object,
  textFieldEditRef: PropTypes.object,
  textFieldRef: PropTypes.func,
  open: PropTypes.bool,
  newNote: PropTypes.func,
  noteSelected: PropTypes.func.isRequired,
  createdData: PropTypes.func,
  deletedData: PropTypes.func,
};

function ListNote({
  data,
  actualNote,
  noteSelected,
  deletedData,
  open,
  newNote,
  textFieldEditRef,
  addButtonRef
}) {
  const [openModal, setOpenModal] = useState();

  const addNote = () => {
    newNote(true);
    noteSelected(null);
  };

  const onDelete = () => {
    deletedData(actualNote.id);
    setOpenModal(false);
  };

  const handleNoteSelected = (e, newNote) => {
    if (newNote !== null) {
      noteSelected(newNote);
    }
  };

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h6" color="primary">
          Notes
        </Typography>
        <Button
          ref={addButtonRef}
          color="primary"
          mb={1}
          onClick={() => {
            addNote();
          }}
        >
          Ajouter +
        </Button>
      </Stack>
      <Box borderRight="1px solid #fffb" bgcolor="#ffffff26" height="100%">
        {data?.length > 0 ? (
          <ToggleButtonGroup
            color="secondary"
            value={actualNote ?? data[0]}
            exclusive
            onChange={handleNoteSelected}
            aria-label="text note"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {data?.map((note, index) => {
              return (
                <PersonnalToggle
                  ref={textFieldEditRef}
                  className="trashNote"
                  sx={
                    index < data.length - 1 && {
                      borderBottom: "1px solid #fffb",
                    }
                  }
                  key={note?.id}
                  value={note}
                  aria-label="left aligned"
                >
                  {note?.libelle}
                  <IconButton
                    color="error"
                    onClick={() => setOpenModal(true)}
                    sx={{ position: "absolute", right: 10, minWidth: 4 }}
                  >
                    <Trash width={20} />
                  </IconButton>
                </PersonnalToggle>
              );
            })}
          </ToggleButtonGroup>
        ) : (
          <Typography textAlign="center" marginTop={5} color="primary">
            Aucune notes
          </Typography>
        )}
        {open && (
          <Stack
            flexDirection="row"
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              border="1px solid red"
            >

            </Typography>
          </Stack>
        )}
        {openModal && (
          <DeleteDialog
            open
            selected={actualNote}
            setOpenModal={setOpenModal}
            onDelete={onDelete}
            title="supprimer la note ?"
          />
        )}
      </Box>
    </>
  );
}

export default ListNote;
