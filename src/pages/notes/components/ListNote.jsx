import { Box, ToggleButtonGroup, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import PersonnalToggle from "../../../components/PersoToggle.jsx";


ListNote.prototype = {
  data: PropTypes.array,
  actualNote: PropTypes.object,
  noteSelected: PropTypes.func,
};

function ListNote({ data, actualNote, noteSelected }) {

  console.log(data);

  return (
    <Box borderRight="1px solid #fffb" bgcolor="#ffffff26" height="100%">
      {
        data.length > 0 ? <ToggleButtonGroup
          color="secondary"
          value={actualNote ?? data[0]}
          exclusive
          onChange={noteSelected}
          aria-label="text note"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {data?.map((note, index) => {
            return (
              <PersonnalToggle sx={index < data.length - 1 && { borderBottom: "1px solid #fffb" }} key={note.id} value={note} aria-label="left aligned">
                {note?.no_libelle}
              </PersonnalToggle>
            )
          })}
        </ToggleButtonGroup>
          : <Typography textAlign="center" marginTop={5} color="primary">Aucune notes</Typography>
      }
    </Box >
  )
}

export default ListNote;