import { Box, TextField, ToggleButtonGroup } from "@mui/material";
import PersonnalToggle from "./PersoToggle";
import PropTypes from 'prop-types';
import { useRef } from "react";

RepertoireList.propTypes = {
  repertoireSelected: PropTypes.func,
  actualRepertoire: PropTypes.string,
  data: PropTypes.array,
  open: PropTypes.func,
}

function RepertoireList({ repertoireSelected, actualRepertoire, data, open }) {
  const textFieldRef = useRef(null);

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
            <PersonnalToggle sx={index < data.length - 1 && { borderBottom: "1px solid #fffb" }} key={repertoire?.id} value={repertoire?.id} aria-label="left aligned">
              {repertoire.re_libelle}
            </PersonnalToggle>
          )
        })}
      </ToggleButtonGroup>
      {open &&
        <TextField
          inputRef={textFieldRef}
          InputProps={{
            style: { color: '#fff' }
          }}
          fullWidth
          color="secondary"
        />
      }
    </Box >
  )
}

export default RepertoireList;