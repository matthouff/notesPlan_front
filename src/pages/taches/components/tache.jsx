import { Divider, IconButton, ListItem, Typography } from "@mui/material";
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

  const couleurs = tache?.labels
    .map((label, index) => `
      ${label.couleur} ${index * (100 / tache?.labels.length)}% 
      ${index * (100 / tache?.labels.length)}%, 
      ${label.couleur} ${(index + 1) * (100 / tache?.labels.length)}% 
      ${(index + 1) * (100 / tache?.labels.length)}%
    `)
    .join(', ');

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      sx={{ bgcolor: "#fff", borderRadius: 2, borderLeft: `5px solid ${tache?.couleur}`, position: "relative", display: "flex", gap: 0.5, flexDirection: "column", alignItems: "flex-start" }}
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
      {tache?.labels.length !== 0 &&
        <Divider
          sx={{
            background: `linear-gradient(to right, ${couleurs})`, height: 5, width: "100%", borderRadius: "100px"
          }}
        />
      }
    </ListItem>
  );
}

export default Tache;