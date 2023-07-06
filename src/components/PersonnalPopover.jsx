import { Box, Button, Dialog, DialogTitle, Popover, Stack, Typography } from "@mui/material";
import { Trash, Edit } from "lucide-react";
import PropTypes from 'prop-types';
import { useState } from "react";

PersonnalPopover.propTypes = {
  anchorEl: PropTypes.object,
  selected: PropTypes.object,
  open: PropTypes.bool,
  setOpenOption: PropTypes.func,
  deletedData: PropTypes.func,
}

function PersonnalPopover({ anchorEl, open, setOpenOption, selected, deletedData }) {
  const [openModal, setOpenModal] = useState();

  const onDelete = () => {
    setOpenOption({ open: false, anchor: null })
    deletedData(selected.id)
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setOpenOption({ open: false, anchor: null })}
      className="custom-popover"
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: 1 }}>
        <Button variant="contained" color="primary" sx={{ borderRadius: "100%", maxWidth: "35px", height: "35px", minWidth: "inherit", p: 1 }}>
          <Edit />
        </Button>
        <Button onClick={() => setOpenModal(true)} variant="contained" color="error" sx={{ borderRadius: "100%", maxWidth: "35px", height: "35px", minWidth: "inherit", p: 1 }}>
          <Trash />
        </Button>
      </Box>
      {
        openModal &&
        <Dialog onClose={() => setOpenModal(false)} open={open}>
          <DialogTitle color="error">Supprimer le répertoire ?</DialogTitle>
          <Stack paddingBottom={2} alignItems="center" gap={3}>
            <Typography variant="body2" fontWeight="bold">({selected?.re_libelle})</Typography>
            <Stack flexDirection="row" gap={2}>
              <Button onClick={() => setOpenModal(false)} variant="contained">
                Annuler
              </Button>
              <Button onClick={() => onDelete()} variant="contained" color="error" >
                Supprimer
              </Button>
            </Stack>
          </Stack>
        </Dialog>
      }
    </Popover >
  )
}

export default PersonnalPopover;