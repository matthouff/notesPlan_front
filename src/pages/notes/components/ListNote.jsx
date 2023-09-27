import {
  Box,
  Button,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import PersonnalToggle from "../../../components/PersoToggle.jsx";

ListNote.propTypes = {
  data: PropTypes.array,
  open: PropTypes.bool,
  actualNote: PropTypes.object,
  addButtonRef: PropTypes.object,
  textFieldEditRef: PropTypes.object,
  newNote: PropTypes.func,
  noteSelected: PropTypes.func,
};

function ListNote({
  data,
  open,
  actualNote,
  noteSelected,
  newNote,
  textFieldEditRef,
  addButtonRef,
}) {
  const addNote = () => {
    newNote(true);
    noteSelected(actualNote);
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
              !open
                ? data.filter((note) => note?.id === actualNote?.id)[0] ??
                  data[0]
                : null
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
                  }}
                  key={note?.id}
                  value={note}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    textAlign="start"
                    variant="body2"
                    textTransform="initial"
                  >
                    {note?.libelle}
                  </Typography>
                </PersonnalToggle>
              );
            })}
          </ToggleButtonGroup>
        ) : (
          <Typography textAlign="center" marginTop={5} color="primary">
            Aucune note
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default ListNote;
