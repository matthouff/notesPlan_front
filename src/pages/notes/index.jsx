import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ListRepertoireGroupe from "./components/ListRepertoireGroupe";
import { Plus } from "lucide-react";
import ListNote from "./components/ListNote";
import useEntityCrud from "../../hooks/useEntityCrud";
import Note from "./components/Note";
import DefaultBox from "../../components/DefaultBox";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState()
  const [noteSelected, setNoteSelected] = useState()

  const { data: repertoires } = useEntityCrud({
    entity: "repertoires_notes",
    createdData: ""
  })

  const { data: notes } = useEntityCrud({
    entity: `notes/repertoire/${repertoireSelected}`,
    enabled: !!repertoireSelected // Permet d'attendre que l'id soit présent pour envoyer la requête
  })

  const selectedRepertoire = (x) => {
    if (x !== null) {
      setRepertoireSelected(x);
    }
  }
  const selectedNote = (x) => {
    if (x !== null) {
      setNoteSelected(x);
    }
  }

  useEffect(() => {
    if (repertoires) {
      setRepertoireSelected(repertoires[0]?.id)
    }
  }, [repertoires])
  useEffect(() => {
    if (notes && repertoires) {
      selectedNote(notes[0]?.id)
    }
  }, [notes, repertoires])

  console.log(noteSelected);

  return (
    <DefaultBox persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 5 }} dark>
      <Stack gap={10} width={repertoires ? "20%" : "100%"}>
        <Typography variant="h1" fontWeight="bold" color="primary" fontSize={70}>Notes</Typography>
        <Stack sx={!repertoires && { width: "20%", textAlign: "center", marginX: "auto" }} gap={1}>
          <Typography variant="h6" color="primary">Repertoires</Typography>
          <ListRepertoireGroupe repertoireSelected={(e, x) => selectedRepertoire(x)} actualRepertoire={repertoireSelected} data={repertoires} />
          <Button>
            <Plus />
          </Button>
        </Stack>
      </Stack>
      {repertoires && notes && <>
        <Stack width="22%">
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="h6" color="primary">Notes</Typography>
            <Button color="primary" mb={1}>Ajouter +</Button>
          </Stack>
          <ListNote data={notes} actualNote={noteSelected} noteSelected={(e, x) => selectedNote(x)} />
        </Stack>
        <Stack width="58%" height="100%">
          <Note note={noteSelected ?? notes[0]} />
        </Stack>
      </>}
    </DefaultBox>
  )
}

export default Notes;