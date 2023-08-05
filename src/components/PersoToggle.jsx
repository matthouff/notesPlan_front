import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

const PersonnalToggle = styled(ToggleButton)(() => ({
  backgroundColor: "none", // Remplacez par la couleur souhaitée
  color: "#fff",
  border: "none",
  borderRadius: 0,
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "#fff4", // Remplacez par la couleur de hover souhaitée
  },
}));

export default PersonnalToggle;


/*
import { ToggleButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Trash } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

const StyledToggle = styled(ToggleButton)(() => ({
  backgroundColor: "none", // Remplacez par la couleur souhaitée
  color: "#fff",
  border: "none",
  borderRadius: 0,
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "#fff4", // Remplacez par la couleur de hover souhaitée
  },
}));


PersonnalToggle.propTypes = {
  note: PropTypes.object,
  data: PropTypes.array,
  index: PropTypes.number,
  textFieldEditRef: PropTypes.func,
  setOpenModal: PropTypes.func,
};

function PersonnalToggle({ textFieldEditRef, note, data, index, setOpenModal }) {
  const [noteHover, setNoteHover] = useState(false);

  return (
    <StyledToggle
      ref={textFieldEditRef}
      onMouseEnter={() => setNoteHover(true)}
      onMouseLeave={() => setNoteHover(false)}
      className="trashNote"
      sx={{
        ...index < data?.length - 1 && {
          borderBottom: "1px solid #fffb",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
      key={note?.id}
      value={note}
      aria-label="left aligned"
    >
      <Typography variant="body2">
        {note?.libelle}
      </Typography>
      {noteHover && <Trash style={{ stroke: "#C00" }} onClick={() => setOpenModal(true)} width={20} />}
    </StyledToggle>
  )
}

export default PersonnalToggle;

*/