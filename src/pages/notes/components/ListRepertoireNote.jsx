import { Box, ToggleButtonGroup } from "@mui/material";
import PropTypes from 'prop-types';
import PersonnalToggle from "../../../components/PersoToggle";

ListRepertoireNote.propTypes = {
  data: PropTypes.array,
  actualRepertoire: PropTypes.string,
  repertoireSelected: PropTypes.func,
};

function ListRepertoireNote({ data, actualRepertoire, repertoireSelected }) {

  return (
    <Box border="1px solid #fffb" borderLeft="none" height="100%">
      <ToggleButtonGroup
        color="secondary"
        value={actualRepertoire}
        exclusive
        onChange={repertoireSelected}
        aria-label="text Repertoire"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {data?.map((repertoire, index) => {
          return (
            <PersonnalToggle sx={index < data.length - 1 && { borderBottom: "1px solid #fffb" }} key={repertoire.id} value={repertoire.id} aria-label="left aligned">
              {repertoire.re_libelle}
            </PersonnalToggle>
          )
        })}
      </ToggleButtonGroup>
    </Box >
  )
}

export default ListRepertoireNote;