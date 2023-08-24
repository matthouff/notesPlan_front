import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DefaultBox from "../../components/DefaultBox";
import SnackBarPerso from "../../components/SnackbarPerso";
import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";



function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isTablet = useResponsive("down", "md");

  return (
    <DefaultBox persoStyle={{
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      p: 0
    }}
    >
      <Typography variant="h1" textAlign="center" color="white" fontSize={isTablet ? 50 : 70}><span style={{ fontWeight: "bold" }}>Bonjour</span> {user.prenom}</Typography>
      <Stack flexDirection="row" gap={isTablet ? 5 : 10}>
        <Button onClick={() => navigate("/notes")} variant="outlined">Mes notes</Button>
        <Button onClick={() => navigate("/taches")} variant="outlined">Mes tâches</Button>
      </Stack>

      <SnackBarPerso />

    </DefaultBox>
  )
}

export default HomePage;