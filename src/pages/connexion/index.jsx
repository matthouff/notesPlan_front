import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import DefaultBox from "../../components/DefaultBox";
import Theme from "../../utils/style";
import { useState } from "react";
import "../connexion/";
import Login from "./components/Login";
import Register from "./components/Register";
import SnackBarPerso from "../../components/SnackbarPerso";
import useResponsive from "../../hooks/useResponsive";

function Connexion() {
  const [auth, setAuth] = useState(true);
  const [responseInfo, setResponse] = useState(null);
  const isTablet = useResponsive("down", "xl");
  const isMobile = useResponsive("down", "md");

  return (
    <DefaultBox persoStyle={{ px: "5%" }}>
      <Grid container height="100%">
        <Grid item xs={12} lg={3}>
          <Typography
            fontSize={(isMobile && 50) || (isTablet && 60)}
            textAlign={isTablet && "center"}
            variant="h1"
            color="primary"
            display="flex"
            flexDirection="column"
            lineHeight={1}
          >
            Weather the storm
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack
            width="100%"
            marginX="auto"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Paper
              sx={{
                borderRadius: 7,
                width: "100%",
                maxWidth: "350px",
                border: `2px solid ${Theme.palette.primary.main}`,
                display: "flex",
                gap: 4,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography variant="h2" fontSize={30}>
                {auth ? "Connexion" : "Inscription"}
              </Typography>
              {auth ? (
                <Login />
              ) : (
                <Register setResponse={setResponse} setAuth={setAuth} />
              )}
              <Divider
                sx={{ border: `1px solid ${Theme.palette.secondary.main}` }}
                width="80%"
              />
              <Typography display="flex" alignItems="center" gap={1}>
                {auth ? "Pas de" : "Déjà un"} compte ?
                <Button
                  onClick={() => setAuth(!auth)}
                  variant="text"
                  color="secondary"
                  to="/notes"
                >
                  {auth ? "Inscription" : "Se connecter"}{" "}
                </Button>
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      {responseInfo?.open && <SnackBarPerso response={responseInfo} />}
    </DefaultBox>
  );
}

export default Connexion;
