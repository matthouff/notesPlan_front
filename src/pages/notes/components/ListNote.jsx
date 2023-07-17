import {
  Box,
  Button,
  FormControl,
  IconButton,
  Stack,
  TextField,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import PersonnalToggle from "../../../components/PersoToggle.jsx";
import { Check, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { useRef, useState } from "react";
import DeleteDialog from "../../../components/DeleteDialog.jsx";

ListNote.propTypes = {
  data: PropTypes.array,
  actualNote: PropTypes.object,
  noteSelected: PropTypes.func.isRequired,
  repertoireId: PropTypes.string,
  createdData: PropTypes.func,
  deletedData: PropTypes.func,
};

function ListNote({
  data,
  actualNote,
  noteSelected,
  repertoireId,
  createdData,
  deletedData,
}) {
  const [libelle, setLibelle] = useState(null);
  const sendButtonRef = useRef(null);
  const textFieldRef = useRef(null);
  const [openModal, setOpenModal] = useState();
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createdData, {
    onSuccess: () => {
      // Mettre à jour la liste des répertoires après la création d'un nouvel élément
      noteSelected();
      queryClient.invalidateQueries("notes");
    },
  });

  const onDelete = () => {
    deletedData(actualNote.id);
    setOpenModal(false);
  };

  const handleChange = (event) => {
    setLibelle(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ repertoireId: repertoireId, libelle: libelle });
    setOpen(false);
    setLibelle(null);
  };

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h6" color="primary">
          Notes
        </Typography>
        <Button color="primary" mb={1} onClick={() => setOpen(true)}>
          Ajouter +
        </Button>
      </Stack>
      <Box borderRight="1px solid #fffb" bgcolor="#ffffff26" height="100%">
        {data?.length > 0 ? (
          <ToggleButtonGroup
            color="secondary"
            value={actualNote ?? data[0]}
            exclusive
            onChange={noteSelected}
            aria-label="text note"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {data?.map((note, index) => {
              return (
                <PersonnalToggle
                  className="trashNote"
                  sx={
                    index < data.length - 1 && {
                      borderBottom: "1px solid #fffb",
                    }
                  }
                  key={note?.id}
                  value={note}
                  aria-label="left aligned"
                >
                  {note?.libelle}
                  <IconButton
                    color="error"
                    onClick={() => setOpenModal(true)}
                    sx={{ position: "absolute", right: 10, minWidth: 4 }}
                  >
                    <Trash width={20} />
                  </IconButton>
                </PersonnalToggle>
              );
            })}
          </ToggleButtonGroup>
        ) : (
          <Typography textAlign="center" marginTop={5} color="primary">
            Aucune notes
          </Typography>
        )}
        {open && (
          <Stack
            flexDirection="row"
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <form
              style={{ display: "flex", alignItems: "center" }}
              onSubmit={handleSubmit}
            >
              <FormControl fullWidth>
                <TextField
                  inputRef={textFieldRef}
                  name="libelle"
                  onChange={handleChange}
                  InputProps={{
                    style: { color: "#fff", paddingRight: 40 },
                  }}
                  fullWidth
                  color="secondary"
                />
              </FormControl>
              <IconButton
                ref={sendButtonRef}
                color="primary"
                type="submit"
                sx={{ position: "absolute", minWidth: 4, right: 10 }}
              >
                <Check />
              </IconButton>
            </form>
          </Stack>
        )}
        {openModal && (
          <DeleteDialog
            open
            selected={actualNote}
            setOpenModal={setOpenModal}
            onDelete={onDelete}
            title="supprimer la note ?"
          />
        )}
      </Box>
    </>
  );
}

export default ListNote;
