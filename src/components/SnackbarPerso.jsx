import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


SnackBarPerso.propTypes = {
  response: PropTypes.object,
};

export default function SnackBarPerso({ response }) {
  const [snackPack, setSnackPack] = useState(null);

  useEffect(() => {
    setSnackPack(response)
  }, [response]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackPack({ ...snackPack, open: false })
  };

  return (
    <Snackbar
      key={snackPack?.key}
      open={snackPack?.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
      message={snackPack?.message}
      action={
        <>
          <Button color="secondary" size="small" onClick={handleClose}>
            ANNULER
          </Button>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <X />
          </IconButton>
        </>
      }
    >
      <Alert onClose={handleClose} severity={snackPack?.type} sx={{ width: '100%' }}>
        {snackPack?.message}
      </Alert>
    </Snackbar>
  );
}
