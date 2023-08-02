import DefaultBox from "../../components/DefaultBox";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import useUser from "../../hooks/useUser";
import Groupe from "./components";
import { Button, Stack } from "@mui/material";

function Taches() {
  const [repertoireSelected, setRepertoireSelected] = useState();
  const { userId } = useUser();

  const { data, createdData, deletedData, editData } = useEntityCrud({
    entity: "repertoires_groupes",
    complement: "user",
    id: userId,
    enabled: !!userId
  });

  return (
    <DefaultBox
      persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 10, paddingBottom: 2 }}
      dark
    >
      <RepertoireList
        repertoires={data}
        actualRepertoire={repertoireSelected}
        setRepertoireSelected={setRepertoireSelected}
        createdData={createdData}
        deletedData={deletedData}
        editData={editData}
      />
      <Stack width="80%" alignItems="flex-end" position="relative">
        <Button sx={{ position: "absolute", top: -50, right: 100 }} variant="contained">
          Ajouter un groupe
        </Button>
        <Groupe repertoireSelected={repertoireSelected} />
      </Stack>
    </DefaultBox >
  );
}

export default Taches;
