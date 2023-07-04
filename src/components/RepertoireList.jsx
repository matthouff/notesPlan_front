import { Box, Button, FormControl, Stack, TextField, ToggleButtonGroup, Typography } from "@mui/material";
import PersonnalToggle from "./PersoToggle";
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { Plus, Check, Trash } from "lucide-react";
import useEntityCrud from "../hooks/useEntityCrud";
import useUser from "../hooks/useUser";
import { useMutation, useQueryClient } from "react-query";

RepertoireList.propTypes = {
  setRepertoireSelected: PropTypes.func,
  actualRepertoire: PropTypes.string,
}

function RepertoireList({ setRepertoireSelected, actualRepertoire }) {
  const textFieldRef = useRef(null);
  const buttonRef = useRef(null);
  const sendButtonRef = useRef(null);
  const [open, setOpen] = useState(false)
  const [libelle, setLibelle] = useState('');
  const { userId } = useUser();


  const { data: repertoires, createdData, deletedData } = useEntityCrud({
    entity: "repertoires_notes",
  })

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createdData, {
    onSuccess: () => {
      // Mettre à jour la liste des répertoires après la création d'un nouvel élément
      queryClient.invalidateQueries("repertoires_notes");
    },
  });


  const handleClickOutside = (event) => {
    if (
      textFieldRef.current && !textFieldRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target) &&
      sendButtonRef.current && !sendButtonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (repertoires) {
      setRepertoireSelected(repertoires[0]?.id)
    }
    if (open) {
      textFieldRef.current.focus();
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [repertoires, setRepertoireSelected, open])

  const selectedRepertoire = (x) => {
    if (x !== null) {
      console.log(x);
      setRepertoireSelected(x);
    }
  }

  const handleChange = (event) => {
    setLibelle(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ id_user: userId, re_libelle: libelle });
    setOpen(false)
  }

  return (
    <Stack gap={10} width={repertoires ? "20%" : "100%"}>
      <Typography variant="h1" fontWeight="bold" color="primary" fontSize={70}>Notes</Typography>
      <Stack sx={!repertoires && { width: "20%", textAlign: "center", marginX: "auto" }} gap={1}>
        <Typography variant="h6" color="primary">Repertoires</Typography>
        <Box border="1px solid #fffb" borderLeft="none" height="100%">
          <ToggleButtonGroup
            color="secondary"
            value={actualRepertoire}
            exclusive
            onChange={(e, x) => selectedRepertoire(x)}
            aria-label="text Repertoire"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {repertoires?.map((repertoire, index) => {
              return (
                <PersonnalToggle sx={index < repertoires.length - 1 && { borderBottom: "1px solid #fffb" }} key={repertoire?.id} value={repertoire?.id} aria-label="left aligned">
                  {repertoire.re_libelle}

                  <Button onClick={() => deletedData(repertoire?.id)} sx={{ position: "absolute", right: 10, minWidth: 4 }}>
                    <Trash width={20} />
                  </Button>
                </PersonnalToggle>
              )
            })}
          </ToggleButtonGroup>
          {open &&
            <Stack flexDirection="row" position="relative" alignItems="center" justifyContent="center">
              <form style={{ display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <TextField
                    inputRef={textFieldRef}
                    name="re_libelle"
                    onChange={handleChange}
                    InputProps={{
                      style: { color: '#fff', paddingRight: 40 }
                    }}
                    fullWidth
                    color="secondary"

                  />
                </FormControl>
                <Button ref={sendButtonRef} type="submit" sx={{ position: "absolute", minWidth: 4, right: 10 }}>
                  <Check />
                </Button>
              </form>
            </Stack>
          }
        </Box >

        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </Stack >
    </Stack >
  )
}

export default RepertoireList;