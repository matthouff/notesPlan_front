import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

SnackBarPerso.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default function SnackBarPerso({ type, message }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 6000);
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}