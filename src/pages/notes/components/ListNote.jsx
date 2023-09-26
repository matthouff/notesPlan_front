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
  actualNote: PropTypes.object,
  addButtonRef: PropTypes.object,
  textFieldEditRef: PropTypes.object,
  newNote: PropTypes.func,
  noteSelected: PropTypes.func.isRequired,
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
    noteSelected(actualNote);
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
            value={
              data.filter((note) => note?.id === actualNote?.id)[0] ?? data[0]
            }
            exclusive
            onChange={handleNoteSelected}
            aria-label="text note"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {data.map((note, index) => {
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
                  <Typography
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    variant="body2"
                    textTransform="initial"
                  >
                    {note?.libelle}
                  </Typography>
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
            Aucune note
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
