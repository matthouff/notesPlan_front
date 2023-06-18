import { createTheme } from "@mui/material";

const Theme = createTheme({
  typography: {
    fontFamily: 'Verdana, sans-serif', // Remplacez par la police de caractères souhaitée
  },
  palette: {
    primary: {
      main: '#fff', // Remplacez cette valeur par votre couleur primaire personnalisée
    },
    secondary:{
      main: '#D5BE87'
    }
  },
});

export default Theme;