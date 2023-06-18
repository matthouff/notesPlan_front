import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DefaultBox from "../../components/DefaultBox";



function HomePage() {
  const navigate = useNavigate()

  return (
    <DefaultBox persoStyle={{
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      p: 0
    }}
    >
      <Typography variant="h1" color="white" fontSize={70}><span style={{ fontWeight: "bold" }}>Bonjour</span> Matthias</Typography>
      <Stack flexDirection="row" gap={10}>
        <Button onClick={() => navigate("/notes")} variant="outlined">Mes notes</Button>
        <Button onClick={() => navigate("/taches")} variant="outlined">Mes tâches</Button>
      </Stack>
    </DefaultBox>
  )
}

export default HomePage;