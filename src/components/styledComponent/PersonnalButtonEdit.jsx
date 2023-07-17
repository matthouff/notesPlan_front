import { IconButton, styled } from "@mui/material";

export const PersoButton = styled(IconButton)(({ theme, error }) => ({
  color: error
    ? theme.palette.getContrastText(theme.palette.error.main)
    : theme.palette.getContrastText(theme.palette.primary.dark),
  backgroundColor: error
    ? theme.palette.error.main
    : theme.palette.primary.light,
  "&:hover": {
    backgroundColor: error
      ? theme.palette.error.dark
      : theme.palette.primary.dark,
  },

  borderRadius: "100%",
  maxWidth: "35px",
  height: "35px",
  minWidth: "inherit",
  p: 1,
}));
