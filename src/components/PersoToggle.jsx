import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

const PersonnalToggle = styled(ToggleButton)(() => ({
  backgroundColor: 'none', // Remplacez par la couleur souhaitée
  color: '#fff',
  border: "none",
  borderRadius: 0,
  justifyContent: "flex-start",
  '&:hover': {
    backgroundColor: '#fff4', // Remplacez par la couleur de hover souhaitée
  },
}));

export default PersonnalToggle;