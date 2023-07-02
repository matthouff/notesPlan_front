import { Box, ToggleButtonGroup, Typography } from "@mui/material";
import PersonnalToggle from "./PersoToggle";
import PropTypes from 'prop-types';

RepertoireList.propTypes = {
  repertoireSelected: PropTypes.func,
  actualRepertoire: PropTypes.string,
  data: PropTypes.array,
}

function RepertoireList({ repertoireSelected, actualRepertoire, data }) {

  return (
    <Box border="1px solid #fffb" borderLeft="none" height="100%">
      {
        data ? <ToggleButtonGroup
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
          :
          <Typography color="primary" variant="body2" fontStyle="italic" my={2}>Vous n&apos;avez pas de répertoires</Typography>
      }
    </Box >
  )
}

export default RepertoireList;