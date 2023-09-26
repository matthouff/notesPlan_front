import { Button, Typography } from "@mui/material";
import DefaultBox from "../components/DefaultBox";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <DefaultBox
      persoStyle={{
        alignItems: "center",
        justifyContent: "center",
        px: 5,
        pt: 0,
        gap: 5,
        color: "#fff",
      }}
    >
      <Typography variant="h1" textAlign="center">
        Erreur 404
      </Typography>
      <Typography variant="body1" fontWeight="bold" textAlign="center">
        La page que vous recherchez n&apos;existe pas.
      </Typography>
      <Button component={Link} variant="contained" to="/">
        Retour à la page d&apos;accueil
      </Button>
    </DefaultBox>
  );
}

export default NotFound;
