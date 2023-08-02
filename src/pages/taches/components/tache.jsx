import { ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

Tache.propTypes = {
  tache: PropTypes.object,
};

function Tache({ tache }) {

  const handleDragStart = (e) => {
    console.log(e.dataTransfer);
  };

  return (
    <ListItem draggable onDragStart={handleDragStart} sx={{ bgcolor: "#fff", borderRadius: 2, borderLeft: `5px solid ${tache?.couleur}` }}>
      <ListItemText primary={tache?.libelle} />
    </ListItem>
  );
}

export default Tache;