import { IconButton, ListItem, Typography } from "@mui/material";
import { MoreVertical } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

Tache.propTypes = {
  tache: PropTypes.object,
  openModal: PropTypes.func,
};

function Tache({ tache, openModal }) {
  const [iconActive, setIconActive] = useState(false)

  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ tache }));
  };

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      sx={{ bgcolor: "#fff", borderRadius: 2, borderLeft: `5px solid ${tache?.couleur}` }}
      onMouseEnter={() => setIconActive(true)}
      onMouseLeave={() => setIconActive(false)}
      secondaryAction={
        iconActive &&
        <IconButton edge="end" onClick={openModal}>
          <MoreVertical />
        </IconButton>
      }
    >
      <Typography sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>
        {tache?.libelle}
      </Typography>
    </ListItem>
  );
}

export default Tache;