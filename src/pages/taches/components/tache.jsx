import { Divider, IconButton, ListItem, Typography } from "@mui/material";
import { MoreVertical } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";

Tache.propTypes = {
  tache: PropTypes.object,
  openModal: PropTypes.func,
};

function Tache({ tache, openModal }) {
  const [iconActive, setIconActive] = useState(false);
  const isDesktop = useResponsive("up", "md");

  const couleursFiltred = tache?.labels.filter(
    (label) => label.couleur !== null
  );

  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ tache }));
  };

  const couleurs = couleursFiltred
    .map(
      (label, index) => `
      ${label.couleur} ${index * (100 / couleursFiltred.length)}% 
      ${index * (100 / couleursFiltred.length)}%, 
      ${label.couleur} ${(index + 1) * (100 / couleursFiltred.length)}% 
      ${(index + 1) * (100 / couleursFiltred.length)}%
    `
    )
    .join(", ");

  return (
    <ListItem
      draggable
      onDragStart={handleDragStart}
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        borderLeft: `5px solid ${tache?.couleur}`,
        position: "relative",
        display: "flex",
        gap: 0.5,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      onMouseEnter={() => setIconActive(true)}
      onMouseLeave={() => setIconActive(false)}
      secondaryAction={
        isDesktop ? (
          iconActive && (
            <IconButton edge="end" onClick={() => openModal(tache)}>
              <MoreVertical />
            </IconButton>
          )
        ) : (
          <IconButton edge="end" onClick={() => openModal(tache)}>
            <MoreVertical />
          </IconButton>
        )
      }
    >
      <Typography
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "wrap",
          textOverflow: "ellipsis",
        }}
      >
        {tache?.libelle}
      </Typography>
      {couleurs.length !== 0 && (
        <Divider
          sx={{
            background: `linear-gradient(to right, ${couleurs})`,
            height: 5,
            width: "100%",
            borderRadius: "100px",
          }}
        />
      )}
    </ListItem>
  );
}

export default Tache;
