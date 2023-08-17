import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DefaultBox from "../../components/DefaultBox";
import SnackBarPerso from "../../components/SnackbarPerso";
import useAuth from "../../hooks/useAuth";



function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <DefaultBox persoStyle={{
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      p: 0
    }}
    >
      <Typography variant="h1" color="white" fontSize={70}><span style={{ fontWeight: "bold" }}>Bonjour</span> {user.prenom}</Typography>
      <Stack flexDirection="row" gap={10}>
        <Button onClick={() => navigate("/notes")} variant="outlined">Mes notes</Button>
        <Button onClick={() => navigate("/taches")} variant="outlined">Mes tâches</Button>
      </Stack>

      <SnackBarPerso />

    </DefaultBox>
  )
}

export default HomePage;