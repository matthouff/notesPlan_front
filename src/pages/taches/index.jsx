import DefaultBox from "../../components/DefaultBox";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import useUser from "../../hooks/useUser";
import Groupe from "./components";
import { Button, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import EditGroupe from "./components/EditGroupe";
import PersonnalPopover from "../../components/PersonnalPopover";

function Taches() {
  const [repertoireSelected, setRepertoireSelected] = useState();
  const [openOption, setOpenOption] = useState();
  const [editGroupeOpen, setEditGroupeOpen] = useState();
  const { userId } = useUser();
  const queryClient = useQueryClient();

  const { data, createdData, deletedData, editData } = useEntityCrud({
    entity: "repertoires_groupes",
    complement: "user",
    id: userId,
    enabled: !!userId
  });

  const { data: groupe, createdData: createGroupe, editData: editGroupe, deletedData: deleteGroupe } = useEntityCrud({
    entity: "groupes",
    complement: "repertoire_groupe",
    id: repertoireSelected,
    enabled: !!repertoireSelected
  });

  const { mutate } = useMutation(openOption?.selected?.id ? editGroupe : createGroupe, {
    onSuccess: () => {
      // Mettre à jour la liste des groupes après la création d'un nouvel élément
      queryClient.invalidateQueries("groupes");
    },
  });

  const handleSubmit = (e, x) => {
    e.preventDefault();


    if (!openOption?.selected?.id) {
      const newGroupe = { ...x, repertoireId: repertoireSelected }
      mutate(newGroupe);
    } else {
      mutate({ id: openOption?.selected.id, ...x });
    }
    setOpenOption(null)
    setEditGroupeOpen(false);
  }

  const handleClose = () => {
    setEditGroupeOpen(false)
    setOpenOption(null)
  }

  return (
    <DefaultBox
      persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 10, paddingBottom: 10 }}
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
      <Stack width="80%" paddingTop={2} maxWidth="80%" alignItems="flex-end" position="relative">
        <Button
          onClick={() => setEditGroupeOpen(true)}
          sx={{ position: "absolute", top: -50, right: 100 }} variant="contained"
        >
          Ajouter un groupe
        </Button>
        <Groupe repertoireSelected={repertoireSelected} data={groupe} setOpenOption={setOpenOption} />
      </Stack>

      {editGroupeOpen &&
        <EditGroupe groupeSelected={openOption?.selected} onClose={handleClose} handleSubmit={(e, x) => handleSubmit(e, x)} />
      }
      {openOption?.open && (
        <PersonnalPopover
          open={openOption?.open}
          anchorEl={openOption?.anchor}
          setOpenOption={setOpenOption}
          selected={openOption?.selected}
          deletedData={deleteGroupe}
          editOpen={setEditGroupeOpen}
        />
      )}
    </DefaultBox >
  );
}

export default Taches;
