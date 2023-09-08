import {
  Box,
  Button,
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
  textFieldRef: PropTypes.object,
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
  newNote,
  textFieldEditRef,
  addButtonRef,
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
    <Stack height="100%">
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h6" color="primary">
          Notes <span style={{ fontSize: 15 }}>({`${data.length}`})</span>
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
      <Box
        borderRight="1px solid #fffb"
        bgcolor="#ffffff26"
        height={600}
        sx={{ overflowY: "auto" }}
      >
        {data?.length > 0 ? (
          <ToggleButtonGroup
            color="secondary"
            value={actualNote ?? data[0]}
            exclusive
            onChange={handleNoteSelected}
            aria-label="text note"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {data
              ?.sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
              .map((note, index) => {
                return (
                  <PersonnalToggle
                    ref={textFieldEditRef}
                    className="trashNote"
                    sx={{
                      ...(index < data.length - 1 && {
                        borderBottom: "1px solid #fffb",
                      }),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={note?.id}
                    value={note}
                    aria-label="left aligned"
                  >
                    <Typography variant="body2">{note?.libelle}</Typography>
                    <Trash
                      style={{ stroke: "#C00" }}
                      onClick={() => setOpenModal(true)}
                      width={20}
                    />
                  </PersonnalToggle>
                );
              })}
          </ToggleButtonGroup>
        ) : (
          <Typography textAlign="center" marginTop={5} color="primary">
            Aucune notes
          </Typography>
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
    </Stack>
  );
}

export default ListNote;
