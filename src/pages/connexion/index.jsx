import { Box, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import DefaultBox from "../../components/DefaultBox";
import Theme from "../../utils/style";
import { useState } from "react";
import "../connexion/"
import Login from "./components/Login";
import Register from "./components/Register";

function Connexion() {
  const [login, setLogin] = useState(true)


  return (
    <DefaultBox
      persoStyle={{ px: "5%", pt: 10 }}
    >
      <Grid container height="100%">
        <Grid item xs={3}>
          <Box>
            <Typography variant="h1" paddingTop="50px" color="primary">
              Souviens <span>Toi</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Stack width="100%" marginX="auto" alignItems="center" justifyContent="center" height="100%" >
            <Paper sx={{ borderRadius: 7, width: "45%", border: `2px solid ${Theme.palette.primary.main}`, display: "flex", gap: 4, flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 }}>
              <Typography variant="h2" fontSize={30}>
                {login ? "Connexion" : "S'inscrire"}
              </Typography>
              {login ?
                <Login />
                :
                <Register />
              }
              <Divider sx={{ border: `1px solid ${Theme.palette.secondary.main}` }} width="80%" />
              <Typography display="flex" alignItems="center" gap={1}>
                {login ? "Pas de" : "Déjà un"} compte ?
                <Button onClick={() => setLogin(!login)} variant="text" color="secondary" to="/notes">{login ? "Créer un compte" : "Se connecter"} </Button>
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </DefaultBox >
  )
}

export default Connexion;