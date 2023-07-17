import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  selected: PropTypes.object,
  setOpenModal: PropTypes.func,
  onDelete: PropTypes.func,
};

export default function DeleteDialog({
  open,
  selected,
  setOpenModal,
  onDelete,
  title,
}) {
  return (
    <Dialog onClose={() => setOpenModal(false)} open={open}>
      <DialogTitle color="error">{title}</DialogTitle>
      <Stack paddingBottom={2} alignItems="center" gap={3}>
        <Typography variant="body2" fontWeight="bold">
          ({selected?.libelle})
        </Typography>
        <Stack flexDirection="row" gap={2} mx={2}>
          <Button onClick={() => setOpenModal(false)} variant="contained">
            Annuler
          </Button>
          <Button onClick={() => onDelete()} variant="contained" color="error">
            Supprimer
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
