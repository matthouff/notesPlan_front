import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useEntityCrud from "../../hooks/useEntityCrud";
import DefaultBox from "../../components/DefaultBox";
import RepertoireList from "../../components/RepertoireList";
import GroupeNotes from "./components/notes";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState()

  const { data: repertoires } = useEntityCrud({
    entity: "repertoires_notes",
    createdData: ""
  })

  const selectedRepertoire = (x) => {
    if (x !== null) {
      setRepertoireSelected(x);
    }
  }

  useEffect(() => {
    if (repertoires) {
      setRepertoireSelected(repertoires[0]?.id)
    }
  }, [repertoires])

  return (
    <DefaultBox persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 5 }} dark>
      <Stack gap={10} width={repertoires ? "20%" : "100%"}>
        <Typography variant="h1" fontWeight="bold" color="primary" fontSize={70}>Notes</Typography>
        <Stack sx={!repertoires && { width: "20%", textAlign: "center", marginX: "auto" }} gap={1}>
          <Typography variant="h6" color="primary">Repertoires</Typography>
          <RepertoireList repertoireSelected={(e, x) => selectedRepertoire(x)} actualRepertoire={repertoireSelected} data={repertoires} />
          <Button>
            <Plus />
          </Button>
        </Stack>
      </Stack>
      {repertoires &&
        <GroupeNotes repertoireSelected={repertoireSelected} />
      }
    </DefaultBox>
  )
}

export default Notes;