import { Box, Button, Dialog, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import useEntityCrud from "../../../hooks/useEntityCrud";
import { Check, Trash, X } from "lucide-react";
import { useState } from "react";
import DeleteDialog from "../../../components/DeleteDialog";

PopperLabel.propTypes = {
  // tacheLabel: PropTypes.array,
  handleClose: PropTypes.func,
  labelSelected: PropTypes.func,
};

function PopperLabel({ handleClose, labelSelected }) {
  const [newLabel, setNewLabel] = useState(null)
  const [selected, setSelected] = useState(null)
  const queryClient = useQueryClient();

  const { data, createdData, deletedData } = useEntityCrud({
    entity: "labels",
  });

  const { mutate } = useMutation(createdData, {
    onSuccess: () => {
      // Mettre à jour la liste des taches après la création d'un nouvel élément
      queryClient.invalidateQueries("groupes");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault()

    mutate({ libelle: newLabel.libelle, couleur: newLabel.couleur })
    setNewLabel(null)
  }

  const onDelete = () => {
    deletedData(selected?.label?.id)
    setSelected(null)
  }

  return (
    <Dialog
      open
      onClose={handleClose}
    >
      <Box sx={{ width: 300, p: 1, bgcolor: 'background.paper', overflow: "hidden", position: "relative" }}>
        <Typography variant="h2" fontSize={20} paddingBottom={2} display="flex" alignItems="center" justifyContent="space-between">
          Mes labels
          <Button onClick={() => setNewLabel(true)} size="small" sx={{ p: 0.5, border: "1px solid #000", color: "#000" }}>
            Nouveau
          </Button>
        </Typography>
        {newLabel &&
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <Stack flexDirection="row" alignItems="center" gap={1} mb={1}>
                <TextField size="small" label="Libelle" value={newLabel?.libelle} variant="outlined" onChange={(e) => setNewLabel({ ...newLabel, libelle: e.target.value })} />
                <input type="color" value={newLabel?.couleur} onInput={(e) => setNewLabel({ ...newLabel, couleur: e.target.value })} />
              </Stack>
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button onClick={() => setNewLabel(false)} variant="contained" color="error" size="small" sx={{ py: 0.5 }}>
                  <X height={20} width={20} />
                </Button>
                <Button type="submit" variant="contained" color="success" size="small" sx={{ py: 0.5 }}>
                  <Check height={20} width={20} />
                </Button>
              </Box>
            </Box>
          </form>
        }
        <List sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          p: 0
        }}>
          {
            data?.sort((a, b) => new Date(b.createdat) - new Date(a.createdat)).map(label => {    /* .filter(x => !tacheLabel.map(y => y.id).includes(x.id)) */
              return (
                <ListItem disablePadding key={label.id} secondaryAction={<IconButton onClick={() => setSelected({ label: label, open: true })} size="small"><Trash height={20} stroke="#C00" /></IconButton>}>
                  <ListItemButton onClick={() => labelSelected(label)} sx={{ background: `linear-gradient(45deg, ${label.couleur} 0%, #fff 25%, transparent)`, borderBottom: `2px solid ${label.couleur}`, borderRadius: "10px", mb: 0.5, py: 0.5 }} >
                    <ListItemText>
                      {label?.libelle}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })
          }
        </List>
      </Box>
      {selected?.open && (
        <DeleteDialog
          open
          selected={selected?.label}
          setOpenModal={setSelected}
          onDelete={onDelete}
          title="supprimer la label ?"
        />
      )}
    </Dialog>
  )
}

export default PopperLabel